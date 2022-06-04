import useSWRImmutable from "swr/immutable";
import ErrorMessage from "../components/ErrorMessage";
import EventPreview from "../components/EventPreview";
import LoadingCircle from "../components/LoadingCircle";
import { EventPreview as EventType } from "../interfaces";

const Events = () => {
  const { data: eventList, error: eventError } = useSWRImmutable(
    () => "/api/events/eventList"
  );

  if (eventError) return <ErrorMessage errorMessage={eventError.message} />;
  if (!eventList) return <LoadingCircle />;

  return (
    <div>
      <h1>Planned Events</h1>
      <div>
        {!eventList.length && (
          <div className="h-32 grid place-content-center">
            <p className="text-lg uppercase font-medium text-gray-300">
              No events planned
            </p>
          </div>
        )}
        {eventList?.map((event: EventType) => (
          <EventPreview key={event.id} />
        ))}
      </div>
    </div>
  );
};

export default Events;
