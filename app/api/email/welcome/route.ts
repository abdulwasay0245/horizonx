import { resend } from '@/lib/resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    await resend.emails.send({
      from: 'HorizonX <noreply@horizonx.com>',
      to: email,
      subject: 'Welcome to HorizonX! 🚀',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #fff; font-size: 28px;">Welcome to HorizonX, ${name}! 🚀</h1>
          <p style="color: #9ca3af; font-size: 16px; line-height: 1.6;">
            You've just taken the first step toward building real-world skills and earning verified certificates.
          </p>
          <p style="color: #9ca3af; font-size: 16px; line-height: 1.6;">Here's what you can do now:</p>
          <ul style="color: #9ca3af; font-size: 16px; line-height: 1.8;">
            <li>📚 Browse available learning tracks</li>
            <li>📝 Complete tasks to build portfolio-ready projects</li>
            <li>🏆 Pass the final test and earn your certificate</li>
          </ul>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/tracks"
             style="display: inline-block; background: #2563eb; color: #fff; font-weight: bold; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 16px;">
            Browse Tracks →
          </a>
          <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">
            — The HorizonX Team
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Welcome email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
