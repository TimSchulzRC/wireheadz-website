import EventCard from "@/components/event-card";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
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
    pageSize: 3,
  });

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="w-full text-6xl text-center mb-12">
        {slice.primary.title}
      </h2>
      <h3 className="w-full text-3xl text-center mb-12">
        {slice.primary.subtitle}
      </h3>
      <div className="flex flex-col items-center space-y-12 ">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <Link href="/events">
          <Button variant="default" size="lg">
            Alle Events
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default Events;
