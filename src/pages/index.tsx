import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { LandingGuild } from "../common/types";
import { HiUserGroup } from "react-icons/hi";

type FeatureProps = {
  title: string;
  desc: string;
  img?: string;
  rowMultiple?: boolean;
};

type SectionProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

type ServerProps = {
  guild: LandingGuild;
};

const MainSection = ({ title, subtitle, children }: SectionProps) => {
  return (
    <section className="w-full px-4 sm:px-8 mb-48 flex flex-col items-center text-center">
      <h1 className="text-2xl md:text-4xl font-semibold mb-2">{title}</h1>
      <h2 className="text-md md:text-xl text-gray-300 mb-8">{subtitle}</h2>
      {children}
    </section>
  );
};

const FeatureItem = ({ title, desc, img, rowMultiple }: FeatureProps) => {
  return (
    <div
      className={`h-full cursor-pointer px-8 py-6 shadow rounded-md bg-gradient-to-tr from-violet-400 to-indigo-500 flex flex-col sm:flex-row items-center justify-between
      ${rowMultiple ? "md:flex-col-reverse md:justify-around" : ""}`}
    >
      <div
        className={`flex flex-col text-center sm:text-left items-center sm:items-start ${
          rowMultiple ? "md:items-center md:text-center" : ""
        }`}
      >
        <h1 className="text-xl md:text-2xl font-semibold sm:mb-1 md:mb-2">
          {title}
        </h1>
        <p className="text-md text-gray-300">{desc}</p>
      </div>
      <div className="hidden md:block">
        <Image
          src={`/img/features/${img}.svg`}
          width={rowMultiple ? 128 : 96}
          height={rowMultiple ? 128 : 96}
          alt="feature img"
        />
      </div>
      <div className="md:hidden">
        <Image
          src={`/img/features/${img}.svg`}
          width={96}
          height={96}
          alt="feature img"
        />
      </div>
    </div>
  );
};

const ServerItem = ({ guild }: ServerProps) => {
  return (
    <div className="bg-gray-800 rounded-md px-6 py-4 flex items-center">
      <div className="flex items-center justify-center p-1.5 rounded-md bg-gray-700">
        <Image
          src="/localeIcons/FlagDE.svg"
          width={48}
          height={48}
          alt="GuildIcon"
        />
      </div>
      <div className="ml-4">
        <h1 className="text-lg font-semibold">{guild.name}</h1>
        <h1 className="flex items-center text-md text-gray-300">
          <HiUserGroup className="mr-1" />
          {guild.memberCount}
        </h1>
      </div>
    </div>
  );
};

const Home = () => {
  const guildList = [
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
    {
      name: "Test Server",
      icon: "guildIcon",
      memberCount: 123412,
    },
  ];
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
      <section className="flex flex-col items-center text-center justify-center min-h-[35em] md:min-h-[40em] px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Plan your next Discord event
        </h1>
        <p className="text-md md:text-lg text-gray-300">
          Create custom events for your target audience and discover your
          interests with the event finder.
        </p>
        <div className="flex flex-col md:flex-row mt-10">
          <button className="btn-primary mb-2 md:mb-0 text-lg mx-4">
            <Link href="/events/create">Plan an Event</Link>
          </button>
          <button className="btn text-lg mx-4">
            <Link href="/servers/@me">Add to your Server</Link>
          </button>
        </div>
      </section>
      <MainSection title="Why EventBot?" subtitle="Bringing your ideas to life">
        <div className="w-full sm:w-4/5 lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:row-span-2">
            <FeatureItem
              title="Creating Events"
              desc="Test"
              img="CreateEvent"
              rowMultiple
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FeatureItem
              title="Discovering Servers"
              desc="Test"
              img="DiscoverServers"
            />
          </div>
          <div className="col-span-2">
            <FeatureItem title="Find Events" desc="Test" img="SearchEvent" />
          </div>
        </div>
      </MainSection>
      <MainSection
        title="Servers using EventBot"
        subtitle="Discover all the communities already using the bot to announce events"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {guildList.map((guildItem, i) => (
            <ServerItem key={i.toString() + guildItem.name} guild={guildItem} />
          ))}
        </div>
      </MainSection>
    </>
  );
};

export default Home;
