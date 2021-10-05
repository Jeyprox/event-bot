import Link from "next/link";
import Head from "next/head";
import notFound from "../styles/Custom404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className="h-[80vh] flex flex-col text-center items-center justify-center px-4 md:px-8">
        <h1 className="text-5xl my-2 px-6 pb-2 border-b border-gray-700">
          404
        </h1>
        <h1 className="mb-4 text-md md:text-xl">
          The page you were looking for could not be found
        </h1>
        <Link href="/">
          <a className="btn-primary text-sm md:text-base">Bring me back home</a>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
