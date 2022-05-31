import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { useSession } from "next-auth/react";

import LoadingCircle from "../../components/LoadingCircle";
import ErrorMessage from "../../components/ErrorMessage";
import { EventItem } from "../../interfaces";

const MyEvents = () => {
  const { data: session } = useSession();
  const {
    data: eventList,
    error: eventError,
    isValidating,
  } = useSWR(() =>
    session ? "/api/events/eventList?userId=" + session?.id : null
  );
  return (
    <>
      <Head>
        <title>Your Events</title>
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-8">Manage your events</h1>
        {isValidating ? (
          <div>
            <LoadingCircle />
          </div>
        ) : eventError ? (
          <ErrorMessage errorMessage={eventError.message} />
        ) : (
          <div className="w-2/3 mb-8">
            {eventList?.map((event: EventItem) => (
              <Link key={event.event_id} href={`/events/${event.event_id}`}>
                <a>
                  <div
                    className="flex items-center justify-between duration-200 px-5 py-4 my-1 rounded-md hover:bg-gray-800"
                    key={event.event_id}
                  >
                    <div className="select-none">
                      <h2 className="text-xl font-medium">
                        {event.event_name}
                      </h2>
                    </div>
                    <button className="btn-primary w-32">Manage</button>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyEvents;
