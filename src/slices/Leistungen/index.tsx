import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

/**
 * Props for `Leistungen`.
 */
export type LeistungenProps = SliceComponentProps<Content.LeistungenSlice>;

/**
 * Component for "Leistungen" Slices.
 */
const Leistungen: FC<LeistungenProps> = async ({ slice }) => {
  const client = createClient();
  const leistungen = await client.getAllByType("leistung", {
    orderings: {
      field: "my.leistung.index",
      direction: "asc",
    },
  });

  return (
    <div
      className={cn(
        "w-full",
        slice.primary.background_color === "Black"
          ? "bg-background"
          : "bg-muted/50 py-1"
      )}
    >
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {isFilled.keyText(slice.primary.title) && (
          <h2 className="w-full text-7xl text-center mb-6 font-bold">
            {slice.primary.title}
          </h2>
        )}
        {isFilled.keyText(slice.primary.subtitle) && (
          <p className="w-full text-xl text-center">{slice.primary.subtitle}</p>
        )}
        <div className="grid gap-6 md:grid-cols-3 py-12">
          {leistungen.map(
            (leistung) =>
              leistung && (
                <Card
                  key={leistung.id}
                  className="flex flex-col transition-transform hover:scale-102 relative"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    {isFilled.image(leistung.data.image) && (
                      <PrismicNextImage
                        field={leistung.data.icon}
                        className="h-8 w-8"
                      />
                    )}
                    <CardTitle className="text-xl font-bold">
                      {isFilled.keyText(leistung.data.title) &&
                        leistung.data.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {isFilled.image(leistung.data.image) && (
                      <PrismicNextImage
                        className="w-full h-48 object-cover rounded-md mb-6"
                        field={leistung.data.image}
                      />
                    )}
                    {isFilled.keyText(leistung.data.short_description) && (
                      <p className="prose prose-slate prose-invert">
                        {leistung.data.short_description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="w-full">
                      <PrismicNextLink
                        document={leistung}
                        key={leistung.id}
                        className="after:absolute after:inset-0"
                      >
                        <span>Mehr erfahren</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </PrismicNextLink>
                    </Button>
                  </CardFooter>
                </Card>
              )
          )}
        </div>
      </Section>
    </div>
  );
};

export default Leistungen;
