"use client";

import { useEffect } from "react";
import { useLocales } from "./locales-wrapper";

export default function LocalesSetter({
  locales,
  children,
}: {
  locales: { lang: string; lang_name: string; url: string }[];
  children: React.ReactNode;
}) {
  const [l, setLocales] = useLocales();
  useEffect(() => setLocales(locales), [locales]);
  return children;
}
