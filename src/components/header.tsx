import { createClient } from "@/prismicio";
import Navigation from "./navigation";

export default async function Header() {
  const client = createClient();
  const leistungen = await client.getAllByType("leistung");
  const games = await client.getAllByType("game");
  const settings = await client.getSingle("settings");
  return (
    <Navigation games={games} leistungen={leistungen} settings={settings} />
  );
}
