import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import axios from "axios";

import styles from "../styles/Home.module.scss";

import { Guild } from "../common/types";
import { getSession } from "next-auth/client";

type Props = {
  guildList: Array<Guild>;
};

const Home: FunctionComponent<Props> = ({ guildList }) => {
  return (
    <>
      <Head>
        <title>EventBot</title>
        <meta
          name="description"
          content="The tool for announcing your next event on your targeted Discord servers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.landingContainer}>
        <h1>Plan your next Discord event</h1>
        <p>
          Create custom events for your target audience and discover your
          interests with the event finder.
        </p>
        <div className={styles.landingDiscover}>
          <button className="btn-primary">
            <Link href="/events/create">Plan an Event</Link>
          </button>
          <button>
            <Link href="/servers/me">Add to your Server</Link>
          </button>
        </div>
      </section>
      <section>
        {guildList?.map((guildItem: Guild) => (
          <div key={guildItem.id}>{guildItem.name}</div>
        ))}
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  const res = await axios.get(
    `http://localhost:3000/api/guilds/guildList?userId=${session?.id}`
  );
  const guildList: Array<Guild> = res.data;

  return { props: { guildList } };
};

export default Home;
