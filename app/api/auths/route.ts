import { sendEmail } from '@/lib/email';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {

    const { email } = await req.json();



    if (!email) {
      return NextResponse.json({ error: 'Email is required' });
    }

    const token = randomBytes(32).toString('hex');

    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: 'Your Magic Link',
        text: `Click here to log in: ${magicLink}`,
        html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
      });
      return NextResponse.json({ message: 'Magic link sent successfully' });
    } catch (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json({ error: 'Failed to send magic link' });
    }
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: 'Error adding currency',
      error
    });

  }
}
