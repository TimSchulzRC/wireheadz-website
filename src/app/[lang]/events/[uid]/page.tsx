import LocalesSetter from "@/components/locales-setter";
import Section from "@/components/section";
import { createClient } from "@/prismicio";
import { getLocales } from "@/utils/getLocales";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import dayjs from "dayjs";
import { Calendar, MapPin } from "lucide-react";

type Params = Promise<{ uid: string; lang: string }>;

export default async function EventPage(props: { params: Params }) {
  const { uid, lang } = await props.params;
  const client = createClient();
  const page = await client.getByUID("event", uid, { lang });
  const {
    data: { image, title, content, start, end, location },
  } = page;
  const locales = await getLocales(page, client);
  return (
    <LocalesSetter locales={locales}>
      <Section className="max-w-4xl">
        {isFilled.keyText(title) && <h1 className="text-center">{title}</h1>}
        <hr className="mt-3 w-64 mx-auto" />
        <h2 className="text-primary mb-12 text-center !text-2xl">Event</h2>
        {isFilled.image(image) && (
          <PrismicNextImage
            field={image}
            className="mb-6 rounded-md aspect-video w-full h-full object-cover"
          />
        )}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {isFilled.date(start) && isFilled.date(end) && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {start === end
                  ? `${dayjs(start).format("DD.MM.YYYY")}`
                  : `${dayjs(start).format("DD.MM.YYYY")} - ${dayjs(end).format("DD.MM.YYYY")}`}
              </span>
            </div>
          )}
          <div>|</div>
          {isFilled.keyText(location) && (
            <div className="flex items-center ">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <hr className="my-12" />
        {isFilled.richText(content) && (
          <div className="rtf">
            <PrismicRichText field={content} />
          </div>
        )}
      </Section>
    </LocalesSetter>
  );
}
