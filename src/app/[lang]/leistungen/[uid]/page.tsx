import { asImageSrc, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import LocalesSetter from "@/components/locales-setter";
import Section from "@/components/section";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLocales } from "@/utils/getLocales";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("leistung", uid, { lang })
    .catch(() => notFound());
  const {
    data: { image, title, slices, short_description, icon },
  } = page;
  const locales = await getLocales(page, client);

  return (
    <LocalesSetter locales={locales}>
      <Section>
        <h2 className="text-primary  !text-2xl">Leistung</h2>
        <hr className="my-3" />

        <div className="grid grid-cols-1 gap-24 md:grid-cols-2 my-24">
          <div className="flex flex-col justify-center items-center">
            {isFilled.image(icon) && (
              <PrismicNextImage field={icon} className="w-32 mb-12" />
            )}
            {isFilled.keyText(title) && (
              <h1 className="!text-4xl mb-6">{title}</h1>
            )}
            {isFilled.keyText(short_description) && (
              <p className="prose prose-slate prose-invert text-balance text-center">
                {short_description}
              </p>
            )}
          </div>
          {isFilled.image(image) && (
            <PrismicNextImage
              field={image}
              className="mb-6 rounded-md aspect-video w-full h-full object-cover"
            />
          )}
        </div>
        <hr />
      </Section>
      <SliceZone slices={slices} components={components} />
    </LocalesSetter>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("leistung", uid, { lang })
    .catch(() => notFound());

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
  const pages = await client.getAllByType("leistung", { lang: "*" });

  return pages.map((page) => ({ uid: page.uid }));
}
