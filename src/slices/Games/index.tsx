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
 * Props for `Games`.
 */
export type GamesProps = SliceComponentProps<Content.GamesSlice>;

/**
 * Component for "Games" Slices.
 */
const Games: FC<GamesProps> = async ({ slice }) => {
  const client = createClient();
  const games = await client.getAllByType("game");

  return (
    <div
      className={cn(
        "w-full",
        slice.primary.background_color === "Black"
          ? "bg-background"
          : "bg-muted/50"
      )}
    >
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              {isFilled.keyText(slice.primary.title) && (
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase">
                  {slice.primary.title}
                </h2>
              )}
              {isFilled.keyText(slice.primary.subtitle) && (
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {slice.primary.subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {games.map((game) => (
              <Card
                key={game.id}
                className="flex flex-col overflow-hidden border border-muted bg-background/50 backdrop-blur transition-transform hover:scale-102"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {game.data.game}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <PrismicNextImage
                      field={game.data.header_image}
                      className="h-full w-full aspect-video object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <PrismicNextLink
                      document={game}
                      className="after:absolute after:inset-0"
                    >
                      <span>Team ansehen</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </PrismicNextLink>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Games;
