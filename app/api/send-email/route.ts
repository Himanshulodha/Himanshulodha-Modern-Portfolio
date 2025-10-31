import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import socialsData from '../../../src/socials.json';

// Ensure API key is present before creating client
const RESEND_KEY = process.env.RESEND_API_KEY;
let resend: Resend | null = null;
if (RESEND_KEY) {
  resend = new Resend(RESEND_KEY);
} else {
  console.warn('RESEND_API_KEY not set — contact form email sending disabled');
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get your email from socials.json
    const emailSocial = socialsData.socials.find(social => social.icon === 'mail');
    const toEmail = emailSocial?.href.replace('mailto:', '') || 'Himanshulodha3302@gmail.com';

    // Ensure resend client is available
    if (!resend) {
      console.error('Resend client unavailable: RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Send email using Resend
    try {
      const sendResult = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // This will be the sender
        to: [toEmail], // Your email from socials.json
        subject: `New Contact Form Message from ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <strong>Name:</strong> ${name}<br>
              <strong>Email:</strong> ${email}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
            <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from the contact form on rahullalwani.com</p>
            <p>Reply directly to this email to respond to ${name} at ${email}</p>
          </div>
        </div>
      `,
        replyTo: email, // This allows you to reply directly to the sender
      });

      // Resend returns metadata in sendResult
      if (!sendResult) {
        console.error('Resend returned unexpected response:', sendResult);
        return NextResponse.json({ error: 'Failed to send email', details: sendResult }, { status: 500 });
      }

      return NextResponse.json({ success: true, result: sendResult as any });
    } catch (sendError) {
      console.error('Error while sending email via Resend:', sendError);
      return NextResponse.json({ error: 'Failed to send email', details: String(sendError) }, { status: 500 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
