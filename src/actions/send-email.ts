"use server";

import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  subject: z
    .string()
    .min(5, { message: "Betreff muss mindestens 5 Zeichen lang sein" }),
  message: z
    .string()
    .min(10, { message: "Nachricht muss mindestens 10 Zeichen lang sein" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendEmail(formData: FormData) {
  // Parse and validate form data
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  // Return validation errors if any
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    const { error } = await resend.emails.send({
      from: "kontaktformular@whzesports.de",
      to: ["esports@fh-zwickau.de"],
      subject: subject,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message:
          "Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später noch einmal.",
      };
    }

    return {
      success: true,
      message:
        "Vielen Dank für deine Nachricht! Wir werden uns so schnell wie möglich bei dir melden.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später noch einmal.",
    };
  }
}
