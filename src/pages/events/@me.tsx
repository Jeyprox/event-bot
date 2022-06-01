import Head from "next/head";
import Link from "next/link";
import useSWRImmutable from "swr/immutable";

import { useSession } from "next-auth/react";

import LoadingCircle from "../../components/LoadingCircle";
import ErrorMessage from "../../components/ErrorMessage";
import { EventPreview } from "../../interfaces";

const MyEvents = () => {
  const { data: session } = useSession();
  const { data: eventList, error: eventError } = useSWRImmutable(() =>
    session ? "/api/events/userEventList?userId=" + session?.id : null
  );

  if (eventError) return <ErrorMessage errorMessage={eventError.message} />;
  if (!eventList) return <LoadingCircle />;

  return (
    <>
      <Head>
        <title>Your Events</title>
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-8">Manage your events</h1>

        <div className="w-2/3 mb-8">
          {!eventList.length && (
            <div className="h-32 grid place-content-center">
              <p className="text-lg uppercase font-medium text-gray-300">
                No events planned
              </p>
            </div>
          )}
          {eventList?.map((event: EventPreview) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <a>
                <div className="flex items-center justify-between duration-200 px-5 py-4 my-1 rounded-md hover:bg-gray-800">
                  <div className="select-none">
                    <h2 className="text-xl font-medium">{event.name}</h2>
                  </div>
                  <button className="btn-primary w-32">Manage</button>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyEvents;
