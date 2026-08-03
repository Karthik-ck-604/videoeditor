import { Resend } from 'resend'
import { logger } from './logger'

// NOTE: The default RESEND_FROM_EMAIL of "onboarding@resend.dev" only delivers
// to the developer's own verified email address until a real sending domain is
// verified on Resend. If you test with the actual RECRUITER_EMAIL and the
// message never arrives in that inbox, this is expected Resend sandbox
// behavior — not a bug. Verify a custom domain in the Resend dashboard and
// switch RESEND_FROM_EMAIL to an address on that domain to deliver to
// arbitrary recipients.
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendRecruiterEmail(
  subject: string,
  body: string,
  toEmail: string = process.env.RECRUITER_EMAIL!,
) {
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: toEmail,
      subject,
      text: body,
    })
    logger.info({ resendId: result.data?.id, to: toEmail }, 'Recruiter email sent')
    return true
  } catch (err) {
    logger.error({ err }, 'Failed to send recruiter email')
    return false
  }
}