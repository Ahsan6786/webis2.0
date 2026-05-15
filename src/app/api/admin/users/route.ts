import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    // Basic Auth Check
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

    // Fetch all users from Firestore
    // Note: Assuming the collection is named 'users' as per prompt. 
    // If emails are stored in another collection like 'leads', we can fetch from there too.
    const usersSnapshot = await adminDb.collection('users').get();
    
    const users: any[] = [];
    usersSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // We can also fetch from leads if they have email just in case
    const leadsSnapshot = await adminDb.collection('leads').get();
    leadsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email) {
        // Only add if not already present by email
        if (!users.find(u => u.email === data.email)) {
           users.push({
             id: doc.id,
             ...data,
             source: data.source || 'lead'
           });
        }
      }
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
