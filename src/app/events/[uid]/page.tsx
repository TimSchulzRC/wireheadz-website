import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

type Params = Promise<{ uid: string }>;

export default async function EventPage(props: { params: Params }) {
  const params = await props.params;
  const client = createClient();
  const eventData = await client.getByUID("event", params.uid);
  return (
    <div className="container max-w-3xl mx-auto p-12 md:py-16">
      <PrismicNextImage field={eventData.data.image} className="mb-24" />
      <h1 className="text-6xl mb-12">{eventData.data.title}</h1>
      <PrismicRichText field={eventData.data.content} />
    </div>
  );
}
