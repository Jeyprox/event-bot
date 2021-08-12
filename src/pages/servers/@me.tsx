import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import { Guild } from "../../common/types";
import { getSession } from "next-auth/client";

import serverStyles from "../../styles/MyServer.module.scss";

type Props = {
  guildList: Array<Guild>;
};

const MyServers: FunctionComponent<Props> = ({ guildList }) => {
  return (
    <section className={serverStyles.container}>
      <h1>Select your server</h1>
      {guildList && (
        <div className={serverStyles.serverList}>
          {" "}
          {guildList?.map((guildItem: Guild) => (
            <Link key={guildItem.id} href={`/servers/${guildItem.id}`} passHref>
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
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });
  if (session) {
    const res = await axios.get(
      `http://localhost:3000/api/guilds/guildList?userId=${session?.id}`
    );
    const guildList: Array<Guild> = res.data;
    return { props: { guildList } };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
};

export default MyServers;
