import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import LocalesSetter from "@/components/locales-setter";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLocales } from "@/utils/getLocales";

type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("page", uid, { lang })
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
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("page", uid, { lang })
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
  const pages = await client.getAllByType("page", { lang: "*" });

  return pages.map((page) => ({ uid: page.uid }));
}
