import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the request body
    const { email } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    // Initialize Resend with API key
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'The Modern Muslim Dad <onboarding@resend.dev>',
      to: email,
      subject: "You're In! Welcome to The Modern Muslim Dad",
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to The Modern Muslim Dad</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f9f9f9;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333333;">You're In! 🧔🏽💫</h2>
          <h3 style="margin-top: 0; color: #666;">Welcome to <strong>The Modern Muslim Dad</strong></h3>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
          <p><strong>As-salaamu Alaikum,</strong></p>

          <p>Just wanted to say — <strong>a huge thank you</strong> for joining <em>The Modern Muslim Dad</em> community!</p>

          <p>We're genuinely excited (and honored!) to have you on this journey with us. You're not just signing up for a product — you're stepping into a movement: one that's about <strong>intentional fatherhood, rooted in faith, love, and purpose</strong>.</p>

          <p>✨ <strong>Here's what's coming your way:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Islamic milestone tracking for your child (ages 0–7)</li>
            <li>Duas, sunnahs, and tools to grow as a father</li>
            <li>Community, stories, and weekly faith-based parenting gems</li>
          </ul>

          <p>We're working hard behind the scenes, and your early support means the world to us. You're part of the foundation. 💛</p>

          <p>Until launch, keep an eye on your inbox — we'll share sneak peeks, exclusive early access updates, and maybe a dad joke or two 😉</p>

          <p><strong>JazakAllah khayr for your trust — we can't wait to build this with you.</strong></p>

          <p>With gratitude,<br />
          — <strong>Suhayl</strong><br />
          Founder, <em>The Modern Muslim Dad</em><br />
          <em>Empowering fathers with faith.</em></p>
        </td>
      </tr>
    </table>
    <table align="center" width="100%" style="max-width: 600px; margin: 20px auto; text-align: center;">
      <tr>
        <td style="color: #999999; font-size: 12px;">
          <p>You're receiving this email because you joined the waitlist at The Modern Muslim Dad.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    })

    if (error) {
      throw error
    }

    // Return success response with CORS headers
    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    // Return error response with CORS headers
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email',
        details: error
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
}) 