import Section from "@/components/section";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

export type CustomerLogosProps =
  SliceComponentProps<Content.CustomerLogosSlice>;

const CustomerLogos: FC<CustomerLogosProps> = ({ slice }) => {
  return (
    <div className="bg-muted/50 w-full">
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="py-8 px-5 relative  font-sans"
      >
        <div className="max-w-[90%] mx-auto grid gap-8 justify-items-center">
          {isFilled.richText(slice.primary.title) && (
            <div className="font-bold text-center">
              <PrismicRichText field={slice.primary.title} />
            </div>
          )}
          {slice.primary.logos.length > 0 && (
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-5 gap-y-8 items-center w-full list-none xl:-ml-12">
              {slice.primary.logos.map(
                (logo) =>
                  isFilled.image(logo.image) && (
                    <li
                      key={logo.image.url}
                      className="m-0 flex justify-center xl:ml-12"
                    >
                      <PrismicNextLink field={logo.link}>
                        <PrismicNextImage
                          field={logo.image}
                          height={26}
                          width={160}
                          className="max-w-40"
                        />
                      </PrismicNextLink>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </Section>
    </div>
  );
};

export default CustomerLogos;
