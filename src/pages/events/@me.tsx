import { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { useSession } from "next-auth/client";

import eventStyles from "../../styles/MyEvents.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";

import { EventItem } from "../../common/types";
import LoadingCircle from "../../components/LoadingCircle";

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
            <LoadingCircle />
          </div>
        ) : eventError ? (
          <div className="error-message">
            <FontAwesomeIcon icon={faFrownOpen} />
            <h2>Error: {eventError.message}</h2>
          </div>
        ) : (
          <div className={eventStyles.eventList}>
            {eventList?.map((event: EventItem) => (
              <div className={eventStyles.eventItem} key={event.event_id}>
                <div className={eventStyles.eventInfo}>
                  <h2>{event.event_name}</h2>
                </div>
                <div className={eventStyles.eventLink}>
                  <Link href={`/events/${event.event_id}`} passHref>
                    <a>
                      <button className="btn btn-primary">Manage</button>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyEvents;
