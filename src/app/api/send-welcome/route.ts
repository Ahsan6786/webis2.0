import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getBroadcastEmailTemplate } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'WEBIS <hello@webiss.shop>';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subject = "Welcome to WEBIS! Let's Build the Future.";
    const message = "We're thrilled to connect with you. Our team will review your request and get back to you shortly to discuss how we can bring your vision to life.";

    // Send the welcome email
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: 'webissssssss@gmail.com',
      to: [email],
      subject: subject,
      html: getBroadcastEmailTemplate(subject, message, name),
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Welcome Email Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
