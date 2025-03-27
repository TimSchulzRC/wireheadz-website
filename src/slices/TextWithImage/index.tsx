import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage: FC<TextWithImageProps> = async ({ slice }) => {
  return (
    <div
      className={cn(
        "w-full",
        slice.primary.inverse_colors ? "bg-muted/50" : "bg-background"
      )}
    >
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div
          className={cn(
            "rounded-lg p-12",
            slice.primary.inverse_colors ? "bg-background" : "bg-muted/50"
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-24 items-center",
              slice.variation === "default"
                ? "md:flex-row"
                : "md:flex-row-reverse"
            )}
          >
            <div className="md:w-1/2">
              {isFilled.richText(slice.primary.text) && (
                <div className="mb-6 rtf prose prose-slate prose-invert text-balance">
                  <PrismicRichText field={slice.primary.text} />
                </div>
              )}
              {slice.primary.links?.length > 0 &&
                slice.primary.links.map(
                  (item) =>
                    isFilled.link(item) && (
                      <Button asChild key={item.key}>
                        <PrismicNextLink field={item}>
                          {item.text}
                        </PrismicNextLink>
                      </Button>
                    )
                )}
            </div>
            <div className="md:w-1/2 ">
              <PrismicNextImage
                field={slice.primary.image}
                className={cn(
                  "rounded-lg object-cover h-full w-full",
                  slice.primary.image_aspect_ratio === "1:1"
                    ? "aspect-square"
                    : "aspect-video"
                )}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TextWithImage;
