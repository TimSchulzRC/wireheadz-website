import { createClient } from "@/prismicio";
import Navigation from "./navigation";

export default async function Header({ lang }: { lang: string }) {
  const client = createClient();
  const settings = await client.getSingle("settings", { lang });
  return <Navigation settings={settings} />;
}
