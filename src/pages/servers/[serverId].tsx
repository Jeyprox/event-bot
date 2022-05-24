import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ErrorMessage from "../../components/ErrorMessage";
import LoadingCircle from "../../components/LoadingCircle";

const ServerItem = () => {
  const router = useRouter();
  const { serverId } = router.query;
  const { data: serverItem, error: guildError } = useSWR(() =>
    serverId ? "/api/guilds/guildItem?guildId=" + serverId : null
  );

  if (guildError)
    return (
      <ErrorMessage
        errorMessage={guildError.message || "Error loading guilds"}
      />
    );
  if (!serverItem) return <LoadingCircle />;

  return (
    <>
      <div>
        <h1>{serverItem?.guildInfo?.name}</h1>
      </div>
    </>
  );
};

export default ServerItem;
