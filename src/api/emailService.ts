interface EmailPayload {
  to: string;
  subject: string;
  message: string;
}

export async function sendEmail({ to, subject, message }: EmailPayload) {
  try {
    const response = await fetch('http://localhost:8084/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
} 