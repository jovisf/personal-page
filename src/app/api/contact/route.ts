import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIdentifier } from '@/lib/api/rate-limit'
import { getLocaleFromRequest, getApiMessage, formatTimeMessage } from '@/lib/api/i18n'

const resend = new Resend(process.env.RESEND_API_KEY)

const limiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 2,
})

const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
})

export async function POST(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request)
    const identifier = getClientIdentifier(request)
    const rateLimitResult = limiter.check(identifier)

    if (!rateLimitResult.success) {
      const resetInMillis = rateLimitResult.resetTime - Date.now()
      const resetInMinutes = Math.ceil(resetInMillis / (60 * 1000))
      const resetInHours = Math.ceil(resetInMillis / (60 * 60 * 1000))
      const resetInSeconds = Math.ceil(resetInMillis / 1000)

      const timeMessage = formatTimeMessage(locale, resetInHours, resetInMinutes, resetInSeconds)
      const errorMessage = `${getApiMessage(locale, 'tooManyRequests')} ${timeMessage}.`

      return NextResponse.json(
        { error: errorMessage },
        { status: 429 }
      )
    }

    const body = await request.json()

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: getApiMessage(locale, 'invalidFormData') },
        { status: 400 }
      )
    }

    const { email, subject, message } = result.data

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'jovisf30@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #021024; border-bottom: 2px solid #718355; padding-bottom: 10px;">
            New Contact from Portfolio
          </h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #E9F5DB; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: getApiMessage(locale, 'failedToSendEmail') },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    const locale = getLocaleFromRequest(request)
    return NextResponse.json(
      { error: getApiMessage(locale, 'internalServerError') },
      { status: 500 }
    )
  }
}
