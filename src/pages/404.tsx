import Link from "next/link";
import Head from "next/head";
import notFound from "../styles/Custom404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className={notFound.notFound}>
        <h1 className={notFound.errorCode}>404</h1>
        <h1>The page you were looking for could not be found</h1>
        <Link href="/">Bring me back home</Link>
      </div>
    </>
  );
};

export default Custom404;
