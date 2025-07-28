"use client";

import { sendEmail } from "@/actions/send-email";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import LocalizedText from "./localized-text";

interface ContactFormProps {
  className?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Wird gesendet...
        </>
      ) : (
        "Nachricht senden"
      )}
    </Button>
  );
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formState, setFormState] = useState<{
    errors?: Record<string, string[]>;
    success?: boolean;
    message?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    const result = await sendEmail(formData);

    setFormState(result);

    if (result.success && formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <div className={className}>
      {formState.success ? (
        <Alert className="bg-primary/10 border-primary mb-6">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary">
            <LocalizedText
              english="Message sent!"
              german="Nachricht gesendet!"
            />
          </AlertTitle>
          <AlertDescription>{formState.message}</AlertDescription>
          <Button className="mt-4" onClick={() => setFormState({})}>
            <LocalizedText
              english="Send new message"
              german="Neue Nachricht senden"
            />
          </Button>
        </Alert>
      ) : (
        <form ref={formRef} action={clientAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              <LocalizedText english="Name" german="Name" />
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Dein Name"
              className={formState.errors?.name ? "border-destructive" : ""}
            />
            {formState.errors?.name && (
              <p className="text-sm text-destructive">
                {formState.errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@domain.com"
              className={formState.errors?.email ? "border-destructive" : ""}
            />
            {formState.errors?.email && (
              <p className="text-sm text-destructive">
                {formState.errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              <LocalizedText english="Subject" german="Betreff" />
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Worum geht es?"
              className={formState.errors?.subject ? "border-destructive" : ""}
            />
            {formState.errors?.subject && (
              <p className="text-sm text-destructive">
                {formState.errors.subject[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              <LocalizedText english="Message" german="Nachricht" />
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="..."
              rows={6}
              className={formState.errors?.message ? "border-destructive" : ""}
            />
            {formState.errors?.message && (
              <p className="text-sm text-destructive">
                {formState.errors.message[0]}
              </p>
            )}
          </div>

          {formState.message && !formState.success && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                <LocalizedText english="Error" german="Fehler" />
              </AlertTitle>
              <AlertDescription>{formState.message}</AlertDescription>
            </Alert>
          )}

          <SubmitButton />
        </form>
      )}
    </div>
  );
}
