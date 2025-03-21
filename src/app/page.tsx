import { Button } from "@/components/ui/button";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

export default async function Home() {
  const client = createClient();
  const homepageData = await client.getSingle("homepage");

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">
              {homepageData.data.title}
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {homepageData.data.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {homepageData.data.links.map((link) => (
                <Button key={link.key} asChild size="lg" variant={link.variant}>
                  <PrismicNextLink field={link} />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"></div>
      </section>

      <SliceZone slices={homepageData.data.slices} components={components} />
    </div>
  );
}
