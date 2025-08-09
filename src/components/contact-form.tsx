"use client";

import { sendEmail } from "@/actions/send-email";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LocalizedText from "./localized-text";

interface ContactFormProps {
  className?: string;
}

const schema = z.object({
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

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ className }: ContactFormProps) {
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const [sent, setSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    setServerMessage(undefined);
    setSent(false);
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("subject", values.subject);
    formData.set("message", values.message);
    const result = await sendEmail(formData);
    setServerMessage(result.message);
    setSent(!!result.success);
    if (result.success) {
      reset();
    }
  };

  return (
    <div className={className}>
      {sent ? (
        <Alert className="bg-primary/10 border-primary mb-6">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary">
            <LocalizedText
              english="Message sent!"
              german="Nachricht gesendet!"
            />
          </AlertTitle>
          <AlertDescription>{serverMessage}</AlertDescription>
          <div>
            <Button
              className="mt-4"
              onClick={() => {
                setSent(false);
                setServerMessage(undefined);
              }}
            >
              <LocalizedText
                english="Send new message"
                german="Neue Nachricht senden"
              />
            </Button>
          </div>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              <LocalizedText english="Name" german="Name" />
            </Label>
            <Input
              id="name"
              placeholder="Dein Name"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@domain.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              <LocalizedText english="Subject" german="Betreff" />
            </Label>
            <Input
              id="subject"
              placeholder="Worum geht es?"
              {...register("subject")}
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              <LocalizedText english="Message" german="Nachricht" />
            </Label>
            <Textarea
              id="message"
              placeholder="..."
              rows={6}
              {...register("message")}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {serverMessage && !sent && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                <LocalizedText english="Error" german="Fehler" />
              </AlertTitle>
              <AlertDescription>{serverMessage}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              "Nachricht senden"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
