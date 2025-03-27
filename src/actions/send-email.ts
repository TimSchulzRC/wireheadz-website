"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

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
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Kontaktformular: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Nachricht:
        ${message}
      `,
      html: `
        <h2>Neue Nachricht vom Kontaktformular</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <h3>Nachricht:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message:
        "Vielen Dank für deine Nachricht! Wir werden uns so schnell wie möglich bei dir melden.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        "Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später noch einmal.",
    };
  }
}
