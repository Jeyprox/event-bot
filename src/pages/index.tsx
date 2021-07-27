import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EventBot</title>
        <meta
          name="description"
          content="The tool for announcing your next event on your targeted Discord servers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Test</h1>
    </div>
  );
}
