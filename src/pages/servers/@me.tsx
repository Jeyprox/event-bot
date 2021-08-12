import { FunctionComponent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import { Guild } from "../../common/types";
import { useSession } from "next-auth/client";

import serverStyles from "../../styles/MyServer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";

type Props = {
  guildList: Array<Guild>;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const resJson = await res.json();
    const error = new Error(resJson.error);
    throw error;
  }

  return res.json();
};

const MyServers: FunctionComponent<Props> = () => {
  const [session] = useSession();
  const {
    data: guildList,
    error: guildError,
    isValidating,
  } = useSWR(() => "/api/guilds/guildList?userId=" + session?.id, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    shouldRetryOnError: false,
  });

  return (
    <>
      <Head>
        <title>Your Servers</title>
      </Head>
      <section className={serverStyles.container}>
        <h1>Select your server</h1>
        {guildError ? (
          <div className={serverStyles.errorMessage}>
            <FontAwesomeIcon icon={faFrownOpen} />
            <h2>Error: {guildError.message}</h2>
          </div>
        ) : isValidating ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className={serverStyles.serverList}>
            {" "}
            {guildList?.map((guildItem: Guild) => (
              <Link
                key={guildItem.id}
                href={`/servers/${guildItem.id}`}
                passHref
              >
                <div className={serverStyles.serverItem}>
                  {" "}
                  <div className={serverStyles.serverInfo}>
                    {guildItem.icon ? (
                      <Image
                        src={`https://cdn.discordapp.com/icons/${guildItem.id}/${guildItem?.icon}.png`}
                        alt="guild icon"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <span>{guildItem.name.match(/\b(\w)/g)}</span>
                    )}
                    <h2>{guildItem.name}</h2>
                  </div>
                  {guildItem?.id ? (
                    <button className="btn-primary">Dashboard</button>
                  ) : (
                    <button>Set Up</button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyServers;
