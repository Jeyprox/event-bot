import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";

import axios from "axios";

import { Guild } from "../../common/types";
import { getSession } from "next-auth/client";

type Props = {
  guildList: Array<Guild>;
};

const MyServers: FunctionComponent<Props> = ({ guildList }) => {
  return (
    <section>
      {guildList?.map((guildItem: Guild) => (
        <div key={guildItem.id}>{guildItem.name}</div>
      ))}
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
  }
  return { props: {} };
};

export default MyServers;
