import { Category, Event } from "@prisma/client";
import useSWRImmutable from "swr/immutable";
import ErrorMessage from "../components/ErrorMessage";
import EventPreview from "../components/EventPreview";
import LoadingCircle from "../components/LoadingCircle";
import PageTitle from "../components/PageTitle";

const Events = () => {
  const { data: eventList, error: eventError } = useSWRImmutable(
    () => "/api/events/eventList"
  );

  if (eventError) return <ErrorMessage errorMessage={eventError.message} />;
  if (!eventList) return <LoadingCircle />;

  return (
    <div className="mx-auto max-w-4xl grid gap-y-8">
      <PageTitle
        title="Planned Events"
        subtitle="Explore all the amazing events planned"
        iconName="calendar"
      />
      <div>
        <div></div>
        {!eventList.length && (
          <div className="h-32 grid place-content-center">
            <p className="text-lg uppercase font-medium text-gray-300">
              No events planned
            </p>
          </div>
        )}
        {eventList?.map((event: Event & { category: Category }) => (
          <EventPreview key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
