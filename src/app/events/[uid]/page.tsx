import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

type Params = Promise<{ uid: string }>;

export default async function EventPage(props: { params: Params }) {
  const params = await props.params;
  const client = createClient();
  const {
    data: { image, title, content },
  } = await client.getByUID("event", params.uid);
  return (
    <div className="container max-w-3xl mx-auto p-12 md:py-16">
      {isFilled.image(image) && (
        <PrismicNextImage field={image} className="mb-24" />
      )}
      {isFilled.richText(title) && <PrismicRichText field={title} />}
      {isFilled.richText(content) && <PrismicRichText field={content} />}
    </div>
  );
}
