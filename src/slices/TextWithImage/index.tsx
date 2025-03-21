import { Button } from "@/components/ui/button";
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container my-24"
    >
      <div className="mt-16 bg-muted/50 rounded-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            {isFilled.richText(slice.primary.text) && (
              <PrismicRichText field={slice.primary.text} />
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
          <div className="md:w-1/2">
            <PrismicNextImage field={slice.primary.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextWithImage;
