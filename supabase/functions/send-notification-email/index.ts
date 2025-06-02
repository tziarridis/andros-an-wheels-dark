
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'contact' | 'finance' | 'appointment' | 'car_order';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: NotificationRequest = await req.json();

    let subject = "";
    let htmlContent = "";
    let toEmail = data.email;

    switch (type) {
      case 'contact':
        subject = "Thank you for contacting us!";
        htmlContent = `
          <h1>Thank you for your inquiry, ${data.name}!</h1>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${data.message}</p>
          <p>Best regards,<br>The Auto Dealership Team</p>
        `;
        break;
      
      case 'appointment':
        subject = "Appointment Confirmation";
        htmlContent = `
          <h1>Appointment Confirmed!</h1>
          <p>Dear ${data.name},</p>
          <p>Your appointment has been scheduled for:</p>
          <p><strong>Date:</strong> ${new Date(data.appointment_date).toLocaleString()}</p>
          <p><strong>Type:</strong> ${data.appointment_type.replace('_', ' ').toUpperCase()}</p>
          ${data.car_id ? `<p><strong>Vehicle:</strong> Related to your inquiry</p>` : ''}
          <p>We look forward to seeing you!</p>
          <p>Best regards,<br>The Auto Dealership Team</p>
        `;
        break;
      
      case 'finance':
        subject = "Finance Application Received";
        htmlContent = `
          <h1>Finance Application Received</h1>
          <p>Dear ${data.name},</p>
          <p>We have received your finance application. Our team will review it and get back to you within 2 business days.</p>
          <p><strong>Loan Amount:</strong> $${data.loan_amount}</p>
          <p>Thank you for choosing us!</p>
          <p>Best regards,<br>The Auto Dealership Team</p>
        `;
        break;
      
      case 'car_order':
        subject = "Car Order Inquiry Received";
        htmlContent = `
          <h1>Car Order Inquiry Received</h1>
          <p>Dear ${data.name},</p>
          <p>We have received your car order inquiry:</p>
          <p><strong>Make:</strong> ${data.car_make}</p>
          <p><strong>Model:</strong> ${data.car_model}</p>
          <p><strong>Budget Range:</strong> ${data.budget_range}</p>
          <p>Our team will search for the perfect vehicle and contact you soon!</p>
          <p>Best regards,<br>The Auto Dealership Team</p>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "Auto Dealership <onboarding@resend.dev>",
      to: [toEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
