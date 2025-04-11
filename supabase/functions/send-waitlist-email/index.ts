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
      from: 'Fatherhood Iman Journey <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Fatherhood Iman Journey!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Fatherhood Iman Journey!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
          <p>We'll keep you updated on our progress and notify you as soon as we launch.</p>
          <p>Best regards,<br>The Fatherhood Iman Journey Team</p>
        </div>
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