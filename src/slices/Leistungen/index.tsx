import Section from "@/components/section";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `Leistungen`.
 */
export type LeistungenProps = SliceComponentProps<Content.LeistungenSlice>;

/**
 * Component for "Leistungen" Slices.
 */
const Leistungen: FC<LeistungenProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.keyText(slice.primary.title) && (
        <h2 className="w-full text-6xl text-center mb-12">
          {slice.primary.title}
        </h2>
      )}
      {isFilled.keyText(slice.primary.subtitle) && (
        <h3 className="w-full text-3xl text-center mb-12">
          {slice.primary.subtitle}
        </h3>
      )}
      Placeholder component for leistungen (variation: {slice.variation}) Slices
    </Section>
  );
};

export default Leistungen;
