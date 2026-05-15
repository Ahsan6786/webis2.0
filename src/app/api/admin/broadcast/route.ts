import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { Resend } from 'resend';
import { getBroadcastEmailTemplate } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');
const FROM_EMAIL = process.env.FROM_EMAIL || 'Mitra AI <mitraai0001@gmail.com>';

// Helper to chunk arrays
const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    try {
      await adminAuth.verifyIdToken(token);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Parse Request
    const body = await req.json();
    const { subject, message, testEmails } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
    }

    let targetUsers: any[] = [];

    if (testEmails && testEmails.length > 0) {
      // For testing, just send to the provided test emails
      targetUsers = testEmails.map((email: string) => ({ email, name: 'Test User' }));
    } else {
      // Fetch all users with email
      const usersSnapshot = await adminDb.collection('users').get();
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email) {
          targetUsers.push({ id: doc.id, ...data });
        }
      });
      
      // Also check leads just in case they hold emails
      const leadsSnapshot = await adminDb.collection('leads').get();
      leadsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email && !targetUsers.find(u => u.email === data.email)) {
          targetUsers.push({ id: doc.id, ...data });
        }
      });
    }

    if (targetUsers.length === 0) {
      return NextResponse.json({ error: 'No users with emails found' }, { status: 400 });
    }

    // 3. Setup batch sending
    // Resend Batch API allows up to 100 emails per request
    const BATCH_SIZE = 100;
    const userChunks = chunkArray(targetUsers, BATCH_SIZE);
    
    let sentCount = 0;
    let failedCount = 0;
    const failedEmails: string[] = [];

    // Create broadcast log entry first
    const broadcastRef = await adminDb.collection('broadcastLogs').add({
      subject,
      message,
      targetCount: targetUsers.length,
      sentCount: 0,
      failedCount: 0,
      status: 'sending',
      createdAt: new Date(),
    });

    // Process each chunk
    for (const chunk of userChunks) {
      const emailBatch = chunk.map((user) => ({
        from: FROM_EMAIL,
        to: [user.email],
        subject: subject,
        html: getBroadcastEmailTemplate(subject, message, user.name),
      }));

      try {
        const { data, error } = await resend.batch.send(emailBatch);
        
        if (error) {
          console.error('Batch send error:', error);
          failedCount += chunk.length;
          chunk.forEach(u => failedEmails.push(u.email));
        } else {
          sentCount += chunk.length;
          
          // Log individual email status
          const batchPromises = chunk.map(user => 
            adminDb.collection('emailStatus').add({
              broadcastId: broadcastRef.id,
              userId: user.id || null,
              email: user.email,
              status: 'sent',
              sentAt: new Date(),
            })
          );
          await Promise.all(batchPromises);
        }
      } catch (err) {
        console.error('Chunk processing error:', err);
        failedCount += chunk.length;
        chunk.forEach(u => failedEmails.push(u.email));
      }
    }

    // Update broadcast log
    await broadcastRef.update({
      sentCount,
      failedCount,
      status: failedCount === 0 ? 'completed' : (sentCount === 0 ? 'failed' : 'partial'),
      failedEmails,
      completedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Broadcast complete',
      stats: { sentCount, failedCount, targetCount: targetUsers.length }
    });

  } catch (error: any) {
    console.error('Broadcast Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
