import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../_components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const response = await req.json();
    
    // Log the received data for debugging
    console.log("Received response:", response);

    const { data, error } = await resend.emails.send({
      from: 'rolanorebelo@resend.dev',
      to: ['rolano.rebelo@gmail.com'],
      subject: response.userName + ' shared a file',
      react: EmailTemplate({ response }),
    });

    // Log the data being sent
    console.log("Email data:", {
      from: 'rolanorebelo@resend.dev',
      to: ['rolano.rebelo@gmail.com'],
      subject: 'File Information',
      react: EmailTemplate({ response }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
