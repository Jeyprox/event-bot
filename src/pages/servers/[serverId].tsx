import { useRouter } from "next/router";
import React from "react";

const ServerItem = () => {
  const router = useRouter();
  const { serverId } = router.query;
  return <div>{serverId}</div>;
};

export default ServerItem;
