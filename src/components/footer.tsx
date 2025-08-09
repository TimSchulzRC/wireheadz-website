import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export default async function Footer({ lang }: { lang: string }) {
  const client = createClient();
  const settings = await client.getSingle("settings", { lang });
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto flex flex-wrap gap-6 justify-end px-6 md:px-12">
        {settings.data.footer_links.map(
          (link) =>
            isFilled.link(link) && (
              <PrismicNextLink
                key={link.key}
                field={link}
                className="text-sm font-medium transition-colors hover:text-primary hover:underline"
              />
            )
        )}
      </div>
    </footer>
  );
}
