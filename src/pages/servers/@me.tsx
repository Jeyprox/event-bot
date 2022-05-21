import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import useSWRImmutable from "swr/immutable";

import { UserGuild } from "../../common/types";
import { useSession } from "next-auth/react";

import LoadingCircle from "../../components/LoadingCircle";
import ErrorMessage from "../../components/ErrorMessage";

const MyServers: FunctionComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: guildList, error: guildError } = useSWRImmutable(() =>
    session ? "/api/guilds/guildList?userId=" + session?.userId : null
  );

  if (guildError)
    return (
      <ErrorMessage
        errorMessage={guildError.message || "Error loading guilds"}
      />
    );
  if (!guildList) return <LoadingCircle />;

  return (
    <>
      <Head>
        <title>Your Servers</title>
      </Head>
      <section className="flex flex-col items-center gap-y-8 my-16">
        <h1 className="text-3xl font-bold">Select your server</h1>
        <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {guildList?.map((guildItem: UserGuild) => (
            <div
              key={guildItem.id}
              className="select-none flex gap-x-2 items-center justify-between"
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
              <button
                className={`w-24 ${
                  guildItem.hasBot
                    ? "btn-primary"
                    : "btn bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() =>
                  guildItem.hasBot
                    ? router.push(`/servers/${guildItem.id}`)
                    : window.open(
                        `https://discord.com/api/oauth2/authorize?client_id=814902736503570492&permissions=8&scope=bot&guild_id=${guildItem.id}`,
                        "",
                        `left=32,top=32,width=480,height=800`
                      )
                }
              >
                {guildItem.hasBot ? "Go" : "Setup"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MyServers;
