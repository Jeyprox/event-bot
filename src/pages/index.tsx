import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

type FeatureProps = {
  title: string;
  desc: string;
  img?: string;
  rowMultiple?: boolean;
};

const FeatureItem = ({ title, desc, img, rowMultiple }: FeatureProps) => {
  return (
    <div
      className={`h-full px-8 py-6 rounded-md bg-gradient-to-tr from-violet-400 to-indigo-500 flex ${
        rowMultiple ? "flex-col-reverse" : ""
      } items-center ${rowMultiple ? "justify-around" : "justify-between"}`}
    >
      <div className={rowMultiple ? "flex flex-col items-center" : ""}>
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-lg text-gray-300">{desc}</p>
      </div>
      <Image
        src={`/img/features/${img}.svg`}
        width={rowMultiple ? 128 : 96}
        height={rowMultiple ? 128 : 96}
        alt="feature img"
      />
    </div>
  );
};

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
      <section className="flex flex-col items-center justify-center min-h-[48em]">
        <h1 className="text-7xl font-bold my-8">
          Plan your next Discord event
        </h1>
        <p className="text-lg text-gray-300">
          Create custom events for your target audience and discover your
          interests with the event finder.
        </p>
        <div className="flex mt-12">
          <button className="btn-primary text-lg mx-4">
            <Link href="/events/create">Plan an Event</Link>
          </button>
          <button className="btn text-lg mx-4">
            <Link href="/servers/@me">Add to your Server</Link>
          </button>
        </div>
      </section>
      <section className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-2">Why EventBot?</h1>
        <h2 className="text-xl text-gray-300 mb-8">
          Bringing your ideas to life
        </h2>
        <div className="w-2/3 grid grid-cols-3 gap-4">
          <div className="col-span-1 row-span-2">
            <FeatureItem
              title="Creating Events"
              desc="Test"
              img="CreateEvent"
              rowMultiple
            />
          </div>
          <div className="col-span-2">
            <FeatureItem
              title="Discovering Servers"
              desc="Test"
              img="DiscoverServers"
            />
          </div>
          <div className="col-span-2">
            <FeatureItem
              title="Discovering Servers"
              desc="Test"
              img="DiscoverServers"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
