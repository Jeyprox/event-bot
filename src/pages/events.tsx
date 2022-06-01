import useSWRImmutable from "swr/immutable";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import { EventPreview } from "../interfaces";

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
        {eventList?.map((event: EventPreview) => (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
