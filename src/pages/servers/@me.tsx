import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";

import { Guild } from "../../common/types";
import { useSession } from "next-auth/client";

import serverStyles from "../../styles/MyServers.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";
import LoadingCircle from "../../components/LoadingCircle";

const MyServers: FunctionComponent = () => {
  const router = useRouter();
  const [session] = useSession();
  const {
    data: guildList,
    error: guildError,
    isValidating,
  } = useSWR(() =>
    session ? "/api/guilds/guildList?userId=" + session?.id : null
  );
  const {
    data: botList,
    error: botError,
    isValidating: botLoading,
  } = useSWR("/api/guilds/activeGuilds");

  const guildLink = (guildId: string) => {
    if (isActive(guildId)) router.push(`/servers/${guildId}`);
    else
      window.open(
        `https://discord.com/api/oauth2/authorize?client_id=814902736503570492&permissions=8&scope=bot&guild_id=${guildId}`,
        "",
        `left=32,top=32,width=480,height=800`
      );
  };

  const isActive = (guildId: string) => {
    const activeGuild = botList?.find((guild: Guild) => guild.id === guildId);
    if (activeGuild) {
      guildList.splice(
        guildList
          .map((guildItem: Guild) => guildItem.id)
          .indexOf(activeGuild.id),
        1
      );
      guildList.splice(0, 0, activeGuild);
      return true;
    }
    return false;
  };

  return (
    <>
      <Head>
        <title>Your Servers</title>
      </Head>
      <section className={serverStyles.container}>
        <h1>Select your server</h1>
        {isValidating ? (
          <div>
            <LoadingCircle />
          </div>
        ) : guildError ? (
          <div className="error-message">
            <FontAwesomeIcon icon={faFrownOpen} />
            <h2>Error: {guildError.message}</h2>
          </div>
        ) : (
          <div className={serverStyles.serverList}>
            {guildList?.map((guildItem: Guild) => (
              <div
                key={guildItem.id}
                className={serverStyles.serverItem}
                onClick={() => guildLink(guildItem.id)}
              >
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
                {!botLoading && !isValidating && isActive(guildItem.id) ? (
                  <button className="btn-primary">Dashboard</button>
                ) : (
                  <button className={serverStyles.setupBtn}>Set Up</button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyServers;
