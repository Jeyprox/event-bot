import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.scss";

const Home: FunctionComponent = () => {
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
    </>
  );
};

export default Home;
