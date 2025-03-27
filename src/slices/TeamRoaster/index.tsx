import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<Content.TeamSlice>;

/**
 * Component for "Team" Slices.
 */
const Team: FC<TeamProps> = ({ slice }) => {
  const { players } = slice.primary;

  return (
    <Section
      className="bg-background"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="font-bold mb-6 uppercase">Team Roster</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player, index) => (
          <Card key={index} className="overflow-hidden group pt-0">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <PrismicNextImage
                field={player.image}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 w-full">
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      {isFilled.keyText(player.peak_rank) && (
                        <>
                          <p className="text-muted-foreground">Peak Rank</p>
                          <p className="font-bold">{player.peak_rank}</p>
                        </>
                      )}
                    </div>
                    <div>
                      {isFilled.keyText(player.lieblings_agent) && (
                        <>
                          <p className="text-muted-foreground">
                            Lieblingsagents
                          </p>
                          <p className="font-bold">{player.lieblings_agent}</p>
                        </>
                      )}
                    </div>
                    <div>
                      {isFilled.keyText(player.studienfach) && (
                        <>
                          <p className="text-muted-foreground">Studienfach</p>
                          <p className="font-bold">{player.studienfach}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl uppercase">
                    {player.gamer_tag}
                  </CardTitle>
                  <CardDescription>{player.name}</CardDescription>
                </div>
                {isFilled.keyText(player.role) && (
                  <Badge variant="outline" className="uppercase">
                    {player.role}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Lieblingsagent: {player.lieblings_agent}
              </p>
              <div>
                {isFilled.keyText(player.zitat) && (
                  <p className="font-bold border-l-2 ps-6">„{player.zitat}“</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Team;
