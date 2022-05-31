import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import {
  HiCalendar,
  HiCheck,
  HiChevronDown,
  HiClipboardList,
  HiCog,
  HiSearch,
} from "react-icons/hi";
import useSWRImmutable from "swr/immutable";
import { AnimatePresence, motion } from "framer-motion";

import ErrorMessage from "../../components/ErrorMessage";
import { GuildIcon } from "../../components/GuildIcon";
import LoadingCircle from "../../components/LoadingCircle";
import { UserGuild } from "../../interfaces";

const ServerItem = () => {
  const router = useRouter();
  const { serverId } = router.query;
  const { data: session } = useSession();
  const { data: guildItem, error: guildError } = useSWRImmutable(() =>
    serverId ? "/api/guilds/guildItem?guildId=" + serverId : null
  );
  const { data: guildList, error: listError } = useSWRImmutable(() =>
    session ? "/api/guilds/guildList?userId=" + session?.userId : null
  );
  const activeGuilds = guildList?.filter((guild: UserGuild) => guild.hasBot);

  const [searchOpen, setSearchOpen] = useState(false);

  if (guildError || listError)
    return (
      <ErrorMessage
        errorMessage={guildError.message || "Error loading guilds"}
      />
    );
  if (!guildItem) return <LoadingCircle />;

  return (
    <>
      <Head>
        <title>EventBot - {guildItem?.guildInfo?.name || "GuildItem"}</title>
      </Head>
      <nav className="px-12 mt-4 mb-12 w-full flex justify-between items-center">
        <ul className="flex items-center gap-x-4 text-lg">
          <li className="nav-item">
            <HiClipboardList />
            <span>Dashboard</span>
          </li>
          <li className="nav-item">
            <HiCog />
            <span>Settings</span>
          </li>
          <li className="nav-item">
            <HiCalendar />
            <span>Events</span>
          </li>
        </ul>
        <div className="flex items-center gap-x-6">
          <div className="flex gap-x-2 items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    placeholder="search..."
                    className=" bg-gray-800 px-4 py-2 text-gray-200 outline-none rounded placeholder:text-gray-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className={`z-10 cursor-pointer p-2 rounded hover:bg-gray-800 duration-200 ${
                searchOpen ? "bg-gray-800" : ""
              }`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <HiSearch className="text-2xl"></HiSearch>
            </div>
          </div>
          {guildList && (
            <Menu as="div" className="relative">
              <Menu.Button
                as="div"
                className="cursor-pointer select-none px-2 py-1.5 rounded flex items-center gap-x-2 hover:bg-gray-800 duration-200"
              >
                <GuildIcon
                  guildId={guildItem?.guildInfo.id}
                  guildName={guildItem?.guildInfo.name}
                  guildIcon={guildItem?.guildInfo.icon}
                  size={32}
                />
                <p>{guildItem.guildInfo.name}</p>
                <HiChevronDown className="text-xl" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="duration-300"
                enterFrom="-translate-y-5 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="duration-300"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-5 opacity-0"
              >
                <Menu.Items className="dropdown">
                  {activeGuilds.map((guild: UserGuild) => (
                    <Menu.Item
                      key={guild.id}
                      as="a"
                      href={`/servers/${guild.id}`}
                      className="w-64 dropdown-item flex items-center justify-between m-1"
                    >
                      <div className="flex gap-x-2 items-center">
                        <GuildIcon
                          guildId={guild.id}
                          guildName={guild.name}
                          guildIcon={guild.icon}
                          size={32}
                        />
                        <p>{guild.name}</p>
                      </div>
                      {serverId === guild.id && (
                        <HiCheck className="text-xl text-indigo-400" />
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </nav>
      <div>
        <h1>{guildItem?.guildInfo?.name}</h1>
      </div>
    </>
  );
};

export default ServerItem;
