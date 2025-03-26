import { asImageSrc, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const { data } = await client.getByUID("game", uid).catch(() => notFound());

  return (
    <>
      <Section>
        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-lg mb-8">
          <PrismicNextImage
            field={data.header_image}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <Badge className="mb-2 bg-secondary text-secondary-foreground">
              {data.title}
            </Badge>
            {isFilled.keyText(data.title) && (
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 uppercase text-shadow-glow">
                {data.title}
              </h1>
            )}
            {isFilled.richText(data.description) && (
              <div className="max-w-[600px] text-muted-foreground md:text-lg rtf">
                <PrismicRichText field={data.description} />
              </div>
            )}
          </div>
        </div>
      </Section>

      <SliceZone slices={data.slices} components={components} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("game", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("game");

  return pages.map((page) => ({ uid: page.uid }));
}
