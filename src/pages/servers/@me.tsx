import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import useSWRImmutable from "swr/immutable";

import { Guild } from "../../common/types";
import { useSession } from "next-auth/react";

import LoadingCircle from "../../components/LoadingCircle";
import ErrorMessage from "../../components/ErrorMessage";

const MyServers: FunctionComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    data: guildList,
    error: guildError,
    isValidating,
  } = useSWRImmutable(() =>
    session ? "/api/guilds/guildList?userId=" + session?.userId : null
  );
  const {
    data: botList,
    error: botError,
    isValidating: botLoading,
  } = useSWRImmutable("/api/guilds/activeGuilds");

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
      <section className="flex flex-col items-center my-16">
        <h1 className="text-3xl font-bold mb-8">Select your server</h1>
        {isValidating ? (
          <div>
            <LoadingCircle />
          </div>
        ) : guildError ? (
          <ErrorMessage errorMessage={guildError.message} />
        ) : (
          <div className="w-4/5 grid grid-cols-2 gap-4">
            {guildList?.map((guildItem: Guild) => (
              <div
                key={guildItem.id}
                className="select-none flex items-center justify-between my-1 px-5 py-3"
              >
                <div className="flex items-center">
                  {guildItem.icon ? (
                    <Image
                      className="rounded-full"
                      src={`https://cdn.discordapp.com/icons/${guildItem.id}/${guildItem?.icon}.png`}
                      alt="guild icon"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <span className="select-none w-[48px] h-[48px] flex items-center justify-center rounded-full border-2 border-gray-300 text-lg font-semibold">
                      {guildItem.name.match(/\b(\w)/g)}
                    </span>
                  )}
                  <h2 className="ml-4 text-lg font-medium">{guildItem.name}</h2>
                </div>
                {!botLoading && !isValidating && isActive(guildItem.id) ? (
                  <button
                    onClick={() => guildLink(guildItem.id)}
                    className="w-32 btn-primary"
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => guildLink(guildItem.id)}
                    className="w-24 btn bg-gray-800 hover:bg-gray-700"
                  >
                    Setup
                  </button>
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
