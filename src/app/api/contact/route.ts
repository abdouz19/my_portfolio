import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "mohamedabderraouf.zouaid.lp1@gmail.com";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, subject, message, honeypot } = body;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!fullName || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `Name: ${fullName}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
