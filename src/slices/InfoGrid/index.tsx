import Section from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `InfoGrid`.
 */
export type InfoGridProps = SliceComponentProps<Content.InfoGridSlice>;

/**
 * Component for "InfoGrid" Slices.
 */
const InfoGrid: FC<InfoGridProps> = ({ slice }) => {
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
          <h2 className="mb-6">{slice.primary.title}</h2>
        )}
        <div
          className={cn(
            "grid sm:grid-cols-2 gap-6",
            slice.variation === "2Columns" ? "md:grid-cols-2" : "md:grid-cols-3"
          )}
        >
          {slice.primary.elements.map((item, index) => (
            <Card
              key={index}
              className={cn(item.full_width && "col-span-full")}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {isFilled.image(item.icon) && (
                  <PrismicNextImage field={item.icon} className="w-8 h-8" />
                )}
                <CardTitle className="text-2xl font-bold">
                  {isFilled.keyText(item.title) && item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isFilled.richText(item.content) && (
                  <div className="rtf prose prose-slate prose-invert text-balance">
                    <PrismicRichText field={item.content} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default InfoGrid;
