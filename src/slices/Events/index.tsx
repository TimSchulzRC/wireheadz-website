import EventCard from "@/components/event-card";
import LocalizedText from "@/components/localized-text";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import { FC } from "react";

/**
 * Props for `Events`.
 */
export type EventsProps = SliceComponentProps<Content.EventsSlice>;

/**
 * Component for "Events" Slices.
 */
const Events: FC<EventsProps> = async ({ slice }) => {
  const client = createClient();
  const events = await client.getAllByType("event", {
    orderings: {
      field: "my.event.end",
      direction: "desc",
    },
    limit: 3,
  });

  return (
    <div
      className={cn(
        "w-full",
        slice.primary.background_color === "Black"
          ? "bg-background"
          : "bg-muted/50 py-1"
      )}
    >
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {isFilled.keyText(slice.primary.title) && (
          <h2 className="w-full font-bold text-center mb-6">
            {slice.primary.title}
          </h2>
        )}
        {isFilled.keyText(slice.primary.subtitle) && (
          <h3 className="w-full text-center mb-24">{slice.primary.subtitle}</h3>
        )}
        <div className="flex flex-col items-center space-y-12 mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/events">
                <LocalizedText
                  english="View All Events"
                  german="Alle Events anzeigen"
                />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Events;
