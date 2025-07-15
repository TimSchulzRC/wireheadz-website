import Contact from "@/components/contact-form";
import Section from "@/components/section";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FC } from "react";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm: FC<ContactFormProps> = ({ slice }) => {
  const { email, telefon, addresse } = slice.primary;
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-muted/30 p-6 rounded-lg space-y-6">
              <h3 className="text-xl font-bold uppercase hyphens-auto">
                Kontaktinformationen
              </h3>

              <div className="space-y-4">
                {isFilled.keyText(email) && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <p className="text-muted-foreground">{email}</p>
                    </div>
                  </div>
                )}

                {isFilled.keyText(telefon) && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-muted-foreground">{telefon}</p>
                    </div>
                  </div>
                )}
                {isFilled.keyText(addresse) && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">{addresse}</p>
                    </div>
                  </div>
                )}

                {/* <div className="flex items-start">
                  <Clock className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Öffnungszeiten</p>
                    <p className="text-muted-foreground">
                      Montag - Freitag: 10:00 - 18:00 Uhr
                      <br />
                      Wochenende: Nach Vereinbarung
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="bg-muted/20 p-6 md:p-8 rounded-lg border border-muted/50">
            <h3 className="text-xl font-bold uppercase mb-6">
              Schreib uns eine Nachricht
            </h3>
            <Contact />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactForm;
