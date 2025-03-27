import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import dayjs from "dayjs";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function EventCard({ event }: { event: Content.EventDocument }) {
  const { data } = event;
  return (
    <Card className="flex flex-col overflow-hidden border border-muted pt-0 h-full relative transition-transform hover:scale-102">
      <div className="aspect-video overflow-hidden relative">
        {isFilled.image(data.image) && (
          <PrismicNextImage
            field={data.image}
            className="aspect-video h-full w-full object-cover"
          />
        )}
        {isFilled.date(data.start) && isFilled.date(data.end) && (
          <div className="absolute top-2 right-2">
            {(() => {
              const now = dayjs();
              const start = dayjs(data.start);
              const end = dayjs(data.end);

              if (now >= start && now <= end) {
                return (
                  <Badge variant="default" className="text-white">
                    Laufend
                  </Badge>
                );
              } else if (now < start) {
                return (
                  <Badge variant="secondary" className="text-background">
                    Kommend
                  </Badge>
                );
              } else {
                return (
                  <Badge
                    variant="outline"
                    className="bg-gray-300 text-gray-700"
                  >
                    Vergangen
                  </Badge>
                );
              }
            })()}
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">
            {isFilled.keyText(data.title) && data.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        {isFilled.date(data.start) && isFilled.date(data.end) && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {data.start === data.end
                ? `${dayjs(data.start).format("DD.MM.YYYY")}`
                : `${dayjs(data.start).format("DD.MM.YYYY")} - ${dayjs(data.end).format("DD.MM.YYYY")}`}
            </span>
          </div>
        )}
        {isFilled.keyText(data.location) && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{data.location}</span>
          </div>
        )}
        {isFilled.keyText(data.description) && (
          <p className="prose prose-slate prose-invert mt-6">
            {data.description}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost">
          <PrismicNextLink
            document={event}
            className="w-full after:absolute after:inset-0"
          >
            <span>Details anzeigen</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PrismicNextLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
