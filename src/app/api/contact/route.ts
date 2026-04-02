import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use STARTTLS instead of legacy Port 465 SSL
      auth: {
        user: process.env.GMAIL_SMTP_USER,
        pass: process.env.GMAIL_SMTP_PASSWORD,
      },
    });

    // Formatting the email that Basharat will receive
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_SMTP_USER}>`, // Needs to be sent via authenticated user to avoid spam filters
      to: process.env.GMAIL_SMTP_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new contact form message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">New Portfolio Submission!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="color: #333;">Message:</h3>
          <p style="white-space: pre-wrap; color: #555; line-height: 1.5;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Nodemailer API Error:", error);
    return NextResponse.json({ error: "Failed to send email. Check SMTP credentials." }, { status: 500 });
  }
}
