import { useRouter } from "next/router";
import useSWR from "swr";

import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoadingCircle from "../../components/LoadingCircle";

const ServerItem = () => {
  const router = useRouter();
  const { serverId } = router.query;
  const {
    data: serverItem,
    error,
    isValidating,
  } = useSWR(() =>
    serverId ? "/api/guilds/guildItem?guildId=" + serverId : null
  );
  return (
    <>
      {isValidating ? (
        <LoadingCircle />
      ) : error ? (
        <div className="error-message">
          <FontAwesomeIcon icon={faFrownOpen} />
          <h2>Error: {error.message}</h2>
        </div>
      ) : (
        <div>{serverItem?.guildInfo?.name}</div>
      )}
    </>
  );
};

export default ServerItem;
