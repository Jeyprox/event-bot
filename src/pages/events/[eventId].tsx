import { useRouter } from "next/router";

const EventItem = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return <div>{eventId}</div>;
};

export default EventItem;
