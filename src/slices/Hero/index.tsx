import { Button } from "@/components/ui/button";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container mx-auto px-4 md:px-6 z-10 opacity-100">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">
            {slice.primary.title}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {slice.primary.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {slice.primary.links.map(
              (link) =>
                isFilled.link(link) && (
                  <Button
                    key={link.key}
                    asChild
                    size="lg"
                    variant={link.variant}
                  >
                    <PrismicNextLink field={link} />
                  </Button>
                )
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-10 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent -z-10" />
    </section>
  );
};

export default Hero;
