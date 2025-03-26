import Section from "@/components/section";
import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { JSX } from "react";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <Section className="flex w-full flex-col items-center">
      <div className="prose prose-lg prose-slate prose-invert ">
        <PrismicRichText
          field={slice.primary.content}
          components={components}
        />
      </div>
    </Section>
  );
};

export default RichText;
