import { FunctionComponent } from "react";
import Head from "next/head";
import useSWR from "swr";

import { useSession } from "next-auth/client";

import eventStyles from "../../styles/MyEvents.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";

import { EventItem } from "../../common/types";

const MyEvents: FunctionComponent = () => {
  const [session] = useSession();
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
      <div className={eventStyles.eventContainer}>
        <h1>Manage your events</h1>
        {isValidating ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : eventError ? (
          <div>
            <FontAwesomeIcon icon={faFrownOpen} />
            <h2>Error: {eventError.message}</h2>
          </div>
        ) : (
          <div className={eventStyles.eventList}>
            {eventList?.map((event: EventItem) => (
              <div key={event.event_id}>{event.event_name}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyEvents;
