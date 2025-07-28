"use client";

import { useParams } from "next/navigation";

export default function LocalizedText({
  english,
  german,
}: {
  english: string;
  german: string;
}) {
  const { lang } = useParams<{ lang: string }>();
  return lang === "en-us" ? english : german;
}
