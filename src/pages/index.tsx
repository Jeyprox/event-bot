import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.scss";

const Home = () => {
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
      <section className="flex flex-col items-center justify-center min-h-[40em]">
        <h1 className="text-6xl font-bold my-2">
          Plan your next Discord event
        </h1>
        <p className="text-lg text-gray-300">
          Create custom events for your target audience and discover your
          interests with the event finder.
        </p>
        <div className="flex mt-10">
          <button className="btn-primary text-lg mx-4">
            <Link href="/events/create">Plan an Event</Link>
          </button>
          <button className="btn text-lg mx-4">
            <Link href="/servers/@me">Add to your Server</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
