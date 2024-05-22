import { Resend } from 'resend';
import * as React from 'react';
import { ContactUsEmail } from '@/app/(Nav)/email/contact-us';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const payload = await req.json();

  try {
    console.log("Invite")
    const { data, error } = await resend.emails.send({
      from: 'Webify <onboarding@resend.dev>',
      to: payload.email,
      subject: `You have been given the access to the agency subaccount, ${payload.name}`,
      react: ContactUsEmail(payload),
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
