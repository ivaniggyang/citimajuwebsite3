import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, company, email, phone, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #0D1B2E;">
      <div style="background: #071E3D; padding: 24px 32px; margin-bottom: 24px;">
        <p style="color: #C8921A; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 8px;">New Website Inquiry</p>
        <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 400;">Citi Maju Group</h1>
      </div>
      <div style="padding: 0 32px 32px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 12px; color: #6B849C; width: 120px;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 14px;">${name}</td></tr>
          ${company ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 12px; color: #6B849C;">Company</td><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 14px;">${company}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 12px; color: #6B849C;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 14px;"><a href="mailto:${email}" style="color: #1B4F8A;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 12px; color: #6B849C;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 14px;">${phone}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 12px; color: #6B849C;">Subject</td><td style="padding: 8px 0; border-bottom: 1px solid #E8F1FB; font-size: 14px; font-weight: 600;">${subject}</td></tr>
        </table>
        <p style="font-size: 12px; color: #6B849C; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
        <div style="background: #F5F2EC; padding: 16px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8F1FB;">
          <p style="font-size: 12px; color: #6B849C;">To reply, email <a href="mailto:${email}" style="color: #1B4F8A;">${email}</a></p>
        </div>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"CMG Website" <${process.env.SMTP_USER}>`,
      to: 'inquiry@citimaju.com',
      replyTo: email,
      subject: `[CMG Inquiry] ${subject}`,
      html,
      text: `New inquiry from ${name}${company ? ` (${company})` : ''}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}Subject: ${subject}\n\n${message}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
