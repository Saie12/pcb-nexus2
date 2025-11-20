"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { Resend } from "resend";

export const sendContactNotification = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const result = await resend.emails.send({
        from: "PCB Nexus Contact <onboarding@resend.dev>",
        to: "saieshsasane@gmail.com",
        subject: `New Contact Form Submission: ${args.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00ff88; border-bottom: 2px solid #00ff88; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>From:</strong> ${args.name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${args.email}</p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${args.subject}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #00ff88; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Message:</h3>
              <p style="white-space: pre-wrap; color: #555;">${args.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
              <p>This email was sent from your PCB Nexus portfolio contact form.</p>
            </div>
          </div>
        `,
      });

      console.log("Email sent successfully:", result);
      return result;
    } catch (error) {
      console.error("Failed to send email notification:", error);
      throw error;
    }
  },
});