import Section from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `TeamInfo`.
 */
export type TeamInfoProps = SliceComponentProps<Content.TeamInfoSlice>;

/**
 * Component for "TeamInfo" Slices.
 */
const TeamInfo: FC<TeamInfoProps> = ({ slice }) => {
  return (
    <Section
      className="grid grid-cols-1 md:grid-cols-5 gap-6"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="text-2xl uppercase">
            {slice.primary.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isFilled.richText(slice.primary.content) && (
            <div className="rtf">
              <PrismicRichText field={slice.primary.content} />
            </div>
          )}
        </CardContent>
      </Card>
      {isFilled.image(slice.primary.team_foto) && (
        <PrismicNextImage
          field={slice.primary.team_foto}
          className="w-full h-full object-cover rounded-md md:col-span-2"
        />
      )}
    </Section>
  );
};

export default TeamInfo;
