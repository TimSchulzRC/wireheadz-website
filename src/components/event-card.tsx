import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import dayjs from "dayjs";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
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
  return (
    <Link
      href={`/events/${event.uid}`}
      className="block transition-transform hover:scale-102"
    >
      <Card className="flex flex-col overflow-hidden border border-muted pt-0 h-full">
        <div className="aspect-video overflow-hidden relative">
          <PrismicNextImage
            field={event.data.image}
            className="aspect-video h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {(() => {
              const now = dayjs();
              const start = dayjs(event.data.start);
              const end = dayjs(event.data.end);
              console.log(now, start, end);

              if (now >= start && now <= end) {
                return (
                  <Badge
                    variant="destructive"
                    className="bg-red-500 text-white"
                  >
                    Laufend
                  </Badge>
                );
              } else if (now < start) {
                return (
                  <Badge variant="secondary" className="bg-blue-500 text-white">
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
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{event.data.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {event.data.start === event.data.end
                ? `${dayjs(event.data.start).format("DD.MM.YYYY")}`
                : `${dayjs(event.data.start).format("DD.MM.YYYY")} - ${dayjs(event.data.end).format("DD.MM.YYYY")}`}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.data.location}</span>
          </div>
          <p className="text-muted-foreground mt-2">{event.data.description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" className="w-full">
            <div>
              <span>Details anzeigen</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
