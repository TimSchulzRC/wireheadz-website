import EventCard from "@/components/event-card";
import LocalesSetter from "@/components/locales-setter";
import { createClient } from "@/prismicio";
import { getLocales } from "@/utils/getLocales";
import { isFilled } from "@prismicio/client";

type Params = { lang: string };

export default async function EventsOverviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  const client = createClient();
  const page = await client.getSingle("events_overview_page", { lang });
  const { data } = page;
  const events = await client.getAllByType("event", {
    orderings: {
      field: "my.event.end",
      direction: "desc",
    },
  });
  const locales = await getLocales(page, client);

  return (
    <LocalesSetter locales={locales}>
      <div className="container mx-auto py-12 md:py-16">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          {isFilled.keyText(data.title) && (
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {data.title}
            </h1>
          )}
          {isFilled.keyText(data.subtitle) && (
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })}
        </div>
      </div>
    </LocalesSetter>
  );
}
