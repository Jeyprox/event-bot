import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ErrorMessage from "../../components/ErrorMessage";
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
        <ErrorMessage errorMessage={error.message} />
      ) : (
        <div>{serverItem?.guildInfo?.name}</div>
      )}
    </>
  );
};

export default ServerItem;
