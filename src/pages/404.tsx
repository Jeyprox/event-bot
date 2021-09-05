import Link from "next/link";
import Head from "next/head";
import notFound from "../styles/Custom404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className="h-[40em] flex flex-col items-center justify-center">
        <h1 className="text-5xl my-2 px-6 pb-2 border-b border-gray-700">
          404
        </h1>
        <h1 className="mb-4 text-xl">
          The page you were looking for could not be found
        </h1>
        <Link href="/">
          <a className="btn-primary text-md">Bring me back home</a>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
