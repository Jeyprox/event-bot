import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { LandingGuild } from "../common/types";
import { HiUserGroup } from "react-icons/hi";
import { motion } from "framer-motion";
import { landingAnimation } from "../common/animations";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

type FeatureProps = {
  title: string;
  desc: string;
  img?: string;
  rowMultiple?: boolean;
};

type SectionProps = {
  title: string;
  subtitle: string;
  loadDelay: number;
  children: React.ReactNode;
};

type ServerProps = {
  guild: LandingGuild;
  itemIndex: number;
};

const MainSection = ({
  title,
  subtitle,
  loadDelay,
  children,
}: SectionProps) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      transition={{ delay: loadDelay, duration: 1 }}
      variants={landingAnimation}
      className="w-full px-4 sm:px-8 mb-48 grid gap-y-8 place-items-center text-center"
    >
      <div className="grid gap-y-2">
        <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
        <h2 className="text-md md:text-xl text-gray-300">{subtitle}</h2>
      </div>
      {children}
    </motion.section>
  );
};

const FeatureItem = ({ title, desc, img, rowMultiple }: FeatureProps) => {
  return (
    <div
      className={`h-full cursor-pointer px-4 py-3 md:px-8 md:py-6 shadow rounded-md bg-gradient-to-tr from-violet-400 to-indigo-500 duration-200 hover:-translate-y-1 flex items-center
      ${
        rowMultiple
          ? "md:flex-col-reverse md:justify-around"
          : "justify-between flex-col sm:flex-row"
      }`}
    >
      <div
        className={`flex flex-col text-center sm:text-left items-center mr-0 ${
          rowMultiple ? "md:text-center items-center" : "mr-6 sm:items-start"
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

const ServerItem = ({ guild, itemIndex }: ServerProps) => {
  return (
    <div
      className={`hidden ${
        itemIndex < 4 ? "!flex" : ""
      } md:flex bg-gray-800 rounded-md px-6 py-4 items-center`}
    >
      <div className="flex items-center justify-center">
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
          <HiUserGroup />
          <p className="ml-1">{guild.memberCount}</p>
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
  ];
  const { t } = useTranslation("homepage");
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
      <motion.section
        initial="hidden"
        animate="visible"
        variants={landingAnimation}
        transition={{ delay: 0.1, duration: 1 }}
        className="flex flex-col items-center text-center justify-center min-h-[35em] md:min-h-[40em] px-4 md:px-0"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          {t("slogan")}
        </h1>
        <p className="text-md md:text-lg text-gray-300">{t("sub-slogan")}</p>
        <div className="flex flex-col md:flex-row mt-10 gap-x-8">
          <button className="btn-primary mb-2 md:mb-0 text-lg">
            <Link href="/events/create">{t("plan-event")}</Link>
          </button>
          <button className="btn text-lg">
            <Link href="/servers/@me">{t("add-bot")}</Link>
          </button>
        </div>
      </motion.section>
      <MainSection
        title={t("why-eventbot")}
        loadDelay={0.2}
        subtitle={t("sub-why-eventbot")}
      >
        <div className="w-full sm:w-4/5 lg:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:row-span-2">
            <FeatureItem
              title="Creating Events"
              desc="Plan the next big event on your server"
              img="CreateEvent"
              rowMultiple
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FeatureItem
              title="Discovering Servers"
              desc="Find new servers with your favourite events"
              img="DiscoverServers"
            />
          </div>
          <div className="col-span-2">
            <FeatureItem
              title="Find Events"
              desc="Search for your interests and all the planned events"
              img="SearchEvent"
            />
          </div>
        </div>
      </MainSection>
      <MainSection
        title="Servers using EventBot"
        loadDelay={0.3}
        subtitle="Discover all the communities already using the bot to announce events"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {guildList.map((guildItem, i) => (
            <ServerItem
              key={i.toString() + guildItem.name}
              guild={guildItem}
              itemIndex={i}
            />
          ))}
        </div>
      </MainSection>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["homepage"])),
    },
  };
};

export default Home;
