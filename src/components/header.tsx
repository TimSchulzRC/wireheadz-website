import { createClient } from "@/prismicio";
import Navigation from "./navigation";

export default async function Header({ lang }: { lang: string }) {
  const client = createClient();
  const leistungen = await client.getAllByType("leistung", { lang });
  const games = await client.getAllByType("game", { lang });
  const settings = await client.getSingle("settings", { lang });
  return (
    <Navigation games={games} leistungen={leistungen} settings={settings} />
  );
}
