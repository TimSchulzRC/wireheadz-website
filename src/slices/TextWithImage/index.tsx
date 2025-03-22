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
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="bg-muted/50 rounded-lg p-12">
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
              <div className="mb-6">
                <PrismicRichText field={slice.primary.text} />
              </div>
            )}
            {slice.primary.links?.length > 0 &&
              slice.primary.links.map((item) => (
                <Button asChild>
                  <PrismicNextLink field={item}>
                    Kontakt aufnehmen
                  </PrismicNextLink>
                </Button>
              ))}
          </div>
          <div className="md:w-1/2 ">
            <PrismicNextImage
              field={slice.primary.image}
              className="rounded-lg aspect-square object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TextWithImage;
