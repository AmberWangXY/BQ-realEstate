import { z } from "zod";
import { baseProcedure } from "../main";
import { db } from "~/server/db";
import { env } from "~/server/env";

// ============================================================================
// EMAIL SERVICE (Resend)
// ============================================================================

interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an email via Resend REST API.
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */
async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] [EMAIL_SEND_ATTEMPT] Provider: RESEND`);
  console.log(`[${timestamp}] [EMAIL_SEND_ATTEMPT] To: ${payload.to}`);
  console.log(`[${timestamp}] [EMAIL_SEND_ATTEMPT] From: ${payload.from}`);
  console.log(`[${timestamp}] [EMAIL_SEND_ATTEMPT] Subject: ${payload.subject}`);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    const data = (await res.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;

    if (!res.ok) {
      const error =
        (data && ("message" in data ? data.message : undefined)) ||
        `Resend request failed with status ${res.status}`;
      console.error(`[${timestamp}] [EMAIL_SEND_FAILURE] Provider: RESEND`);
      console.error(`[${timestamp}] [EMAIL_SEND_FAILURE] Error: ${error}`);
      return { success: false, error };
    }

    const messageId = data?.id;
    console.log(`[${timestamp}] [EMAIL_SEND_SUCCESS] Provider: RESEND`);
    if (messageId) console.log(`[${timestamp}] [EMAIL_SEND_SUCCESS] MessageId: ${messageId}`);
    console.log(`[${timestamp}] [EMAIL_SEND_SUCCESS] Recipient: ${payload.to}`);

    return { success: true, messageId };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[${timestamp}] [EMAIL_SEND_FAILURE] Provider: RESEND`);
    console.error(`[${timestamp}] [EMAIL_SEND_FAILURE] Error: ${error}`);
    return { success: false, error };
  }
}

/**
 * Generate HTML email template for contact form submission
 */
function generateContactEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
    .value { background: white; padding: 12px; border-radius: 4px; border-left: 4px solid #d4af37; }
    .inquiry-type { display: inline-block; background: #d4af37; color: #1e3a8a; padding: 4px 12px; border-radius: 4px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>BQ Realty Group</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Inquiry Type:</div>
        <div class="value"><span class="inquiry-type">${data.inquiryType.toUpperCase()}</span></div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text version of contact email
 */
function generateContactEmailText(data: {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
}): string {
  return `
New Contact Form Submission - BQ Realty Group

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Inquiry Type: ${data.inquiryType.toUpperCase()}

Message:
${data.message}
  `.trim();
}

// ============================================================================
// TRPC PROCEDURES
// ============================================================================

export const submitContactForm = baseProcedure
  .input(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      phone: z.string().optional(),
      inquiryType: z.enum(["buy", "sell", "rent", "other"]),
      message: z.string().min(10, "Message must be at least 10 characters"),
    })
  )
  .mutation(async ({ input }) => {
    const timestamp = new Date().toISOString();
    const procedureName = "contact.submit";

    // Log: Request received
    console.log(`[${timestamp}] [CONTACT_REQUEST_RECEIVED] Procedure: ${procedureName}`);
    console.log(`[${timestamp}] [CONTACT_REQUEST_RECEIVED] From: ${input.email}`);
    console.log(`[${timestamp}] [CONTACT_REQUEST_RECEIVED] Name: ${input.name}`);
    console.log(`[${timestamp}] [CONTACT_REQUEST_RECEIVED] Inquiry: ${input.inquiryType}`);

    // Save to database (existing functionality)
    const submission = await db.contactSubmission.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        inquiryType: input.inquiryType,
        message: input.message,
      },
    });

    console.log(`[${timestamp}] [DATABASE_SAVE_SUCCESS] SubmissionId: ${submission.id}`);

    // Determine recipient email (override with env var if set)
    const defaultRecipient = "billqin@bqrealtygroup.com";
    const recipientEmail = env.CONTACT_TO_EMAIL || defaultRecipient;

    if (env.CONTACT_TO_EMAIL) {
      console.log(`[${timestamp}] [RECIPIENT_OVERRIDE] Using env var CONTACT_TO_EMAIL: ${recipientEmail}`);
    } else {
      console.log(`[${timestamp}] [RECIPIENT_DEFAULT] Using default recipient: ${recipientEmail}`);
    }

    // Send email notification
    try {
      // Resend requires a verified domain for custom FROM addresses.
      // Use the Resend testing address in development to avoid blocking local testing.
      const defaultFromAddress = env.EMAIL_FROM ||"billqin@bqrealtygroup.com";
      const fromAddress =
        env.NODE_ENV === "development"
          ? "onboarding@resend.dev"
          : defaultFromAddress;

      const emailPayload: EmailPayload = {
        to: recipientEmail,
        from: fromAddress,
        subject: `New Contact: ${input.inquiryType.toUpperCase()} - ${input.name}`,
        html: generateContactEmailHtml(input),
        text: generateContactEmailText(input),
      };

      const emailResult = await sendEmail(emailPayload);

      if (!emailResult.success) {
        console.error(`[${timestamp}] [EMAIL_SEND_ERROR] Failed to send email: ${emailResult.error}`);
        // Don't throw error - we still saved to database
        // In production, you might want to retry or alert admins
      }

      return {
        success: true,
        submissionId: submission.id,
        emailSent: emailResult.success,
        message: "Thank you for contacting us! We'll get back to you soon.",
      };
    } catch (error) {
      console.error(`[${timestamp}] [EMAIL_SEND_EXCEPTION]`, error);

      // Still return success since database save worked
      return {
        success: true,
        submissionId: submission.id,
        emailSent: false,
        message: "Thank you for contacting us! We'll get back to you soon.",
      };
    }
  });

export const getContactSubmissions = baseProcedure.query(async () => {
  const submissions = await db.contactSubmission.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  return submissions;
});
