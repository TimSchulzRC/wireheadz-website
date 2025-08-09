import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import LocalesSetter from "@/components/locales-setter";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLocales } from "@/utils/getLocales";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const client = createClient();
  const page = await client
    .getSingle("homepage", { lang })
    .catch(() => notFound());
  const locales = await getLocales(page, client);
  return (
    <LocalesSetter locales={locales}>
      <SliceZone slices={page.data.slices} components={components} />
    </LocalesSetter>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const page = await client
    .getSingle("homepage", { lang })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
