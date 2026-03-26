import { resend } from '@/lib/resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, name, trackName, score, certificateId } = await request.json()

    await resend.emails.send({
      from: 'HorizonX <noreply@horizonx.com>',
      to: email,
      subject: `Congratulations! 🏆 You earned a certificate!`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #fff; font-size: 28px;">You Did It! 🏆</h1>
          <p style="color: #9ca3af; font-size: 16px; line-height: 1.6;">
            Congratulations, ${name}! You've passed the <strong style="color: #60a5fa;">${trackName}</strong> final test with a score of <strong style="color: #facc15;">${score}%</strong>.
          </p>
          <p style="color: #9ca3af; font-size: 16px; line-height: 1.6;">
            Your certificate is ready. You can download it as a PDF or share it on LinkedIn!
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/certificate/${certificateId}"
             style="display: inline-block; background: #2563eb; color: #fff; font-weight: bold; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 16px;">
            🎓 View Your Certificate
          </a>
          <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">
            — The HorizonX Team
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Certificate email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
