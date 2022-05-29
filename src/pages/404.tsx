import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className="h-[60vh] flex flex-col text-center items-center justify-center px-4 md:px-8">
        <div className="relative w-2/3 h-80 mb-8">
          <Image
            src="/img/voxel/NotFoundVoxel.png"
            alt="NotFound"
            layout="fill"
            className="object-contain"
          ></Image>
        </div>
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
