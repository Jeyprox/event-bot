import { Category, Event } from "@prisma/client";
import Image from "next/image";
import { HiAdjustments } from "react-icons/hi";
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
      <div className="divide-y divide-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image
              src="/img/icons/search.svg"
              alt="Search Icon"
              width={24}
              height={24}
              layout="fixed"
            />
            <input
              className="w-64 bg-gray-900 border-none focus:ring-0 px-4 py-2"
              type="text"
              placeholder="Search events..."
            />
          </div>
          <div>
            <button type="button" className="p-1.5 hover:bg-gray-800 rounded">
              <HiAdjustments className="text-2xl text-indigo-400" />
            </button>
          </div>
        </div>
        <div className="w-full p-4 py-4 grid grid-cols-5 text-gray-300 text-sm">
          <h3 className="col-span-2">Event Name</h3>
          <h3>Category</h3>
          <h3>Event Date</h3>
          <h3>Details</h3>
        </div>
        {!eventList.length && (
          <div className="h-32 grid place-content-center">
            <p className="text-lg uppercase font-medium text-gray-300">
              No events planned
            </p>
          </div>
        )}
        <div className="py-2">
          {eventList?.map((event: Event & { category: Category }) => (
            <EventPreview key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
