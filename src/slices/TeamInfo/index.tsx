import Section from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
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
          <CardTitle className="text-2xl uppercase">Team Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Das WireHeadZ Valorant-Team wurde 2020 gegründet, kurz nach der
            offiziellen Veröffentlichung des Spiels. Seitdem hat sich das Team
            zu einer der dominantesten Kräfte in der deutschen und europäischen
            Valorant-Szene entwickelt.
          </p>
          <p className="mb-4">
            Mit einem Fokus auf strategisches Gameplay und individuelles Können
            hat unser Team mehrere nationale Meisterschaften gewonnen und sich
            international einen Namen gemacht. Die Mischung aus erfahrenen
            Spielern und jungen Talenten macht WireHeadZ Valorant zu einem
            gefürchteten Gegner auf jedem Turnier.
          </p>
          <p>
            Unter der Leitung von Coach Max "StratMaster" Weber trainiert das
            Team täglich in unserem hochmodernen Trainingszentrum in München, um
            ihre Fähigkeiten kontinuierlich zu verbessern und neue Strategien zu
            entwickeln.
          </p>
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
