import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Validate env vars
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the site owner directly.' },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER

    // 1. Notification email to site owner
    await transporter.sendMail({
      from: `"Charm Portfolio " <${process.env.GMAIL_USER}>`,
      to: ownerEmail,
      subject: `📩 New Contact from ${name} — Charm Portfolio`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #0f172a; color: #e2e8f0; }
            .container { max-width: 560px; margin: 40px auto; background: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; }
            .header { background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 32px 32px 24px; }
            .header h1 { margin: 0; color: #fff; font-size: 22px; font-weight: 700; }
            .header p { margin: 4px 0 0; color: rgba(255,255,255,0.75); font-size: 14px; }
            .body { padding: 32px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 6px; }
            .value { font-size: 15px; color: #e2e8f0; background: #0f172a; border-radius: 8px; padding: 12px 16px; border: 1px solid #334155; }
            .message-value { white-space: pre-wrap; line-height: 1.6; }
            .footer { padding: 16px 32px 24px; text-align: center; font-size: 12px; color: #475569; border-top: 1px solid #334155; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
              <p>Received from your portfolio website</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value message-value">${message}</div>
              </div>
            </div>
            <div class="footer">
              Sent from Charm Portfolio — ${new Date().toUTCString()}
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // 2. Auto-reply to the sender
    await transporter.sendMail({
      from: `"Charm Bautista" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}! — Charm`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #0f172a; color: #e2e8f0; }
            .container { max-width: 560px; margin: 40px auto; background: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; }
            .header { background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 40px 32px; text-align: center; }
            .header h1 { margin: 0 0 8px; color: #fff; font-size: 26px; font-weight: 700; }
            .header p { margin: 0; color: rgba(255,255,255,0.8); font-size: 15px; }
            .body { padding: 36px 32px; }
            .body p { margin: 0 0 16px; font-size: 15px; color: #cbd5e1; line-height: 1.7; }
            .body p:last-child { margin: 0; }
            .quote-box { background: #0f172a; border-left: 3px solid #2563eb; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 24px 0; }
            .quote-box p { color: #94a3b8; font-style: italic; font-size: 14px; margin: 0; }
            .signature { margin-top: 28px; padding-top: 24px; border-top: 1px solid #334155; }
            .sig-name { font-size: 17px; font-weight: 700; color: #fff; margin: 0 0 2px; }
            .sig-title { font-size: 13px; color: #2563eb; margin: 0 0 8px; }
            .sig-contact { font-size: 13px; color: #64748b; margin: 0; }
            .footer { padding: 16px 32px; text-align: center; font-size: 12px; color: #475569; border-top: 1px solid #334155; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Got your message!</h1>
              <p>I'll be in touch within 24 hours</p>
            </div>
            <div class="body">
              <p>Hi ${name.split(' ')[0]},</p>
              <p>
                Thanks for reaching out through my portfolio. I've received your message and will get back to you as soon as possible — typically within 24 hours.
              </p>
              <div class="quote-box">
                <p>"${message.length > 180 ? message.slice(0, 180) + '…' : message}"</p>
              </div>
              <p>
                In the meantime, feel free to connect with me on LinkedIn or browse my GitHub for more of my work.
              </p>
              <div class="signature">
                <p class="sig-name">Charm Bautista</p>
                <p class="sig-title">Senior Java / Software Engineer</p>
                <p class="sig-contact">charm.rmb@gmail.com · +971-582851009</p>
              </div>
            </div>
            <div class="footer">
              This is an automated confirmation. Please do not reply to this email directly.
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully.' })

  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact directly via email.' },
      { status: 500 }
    )
  }
}
