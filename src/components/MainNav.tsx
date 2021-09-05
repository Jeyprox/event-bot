import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { signIn, signOut, useSession } from "next-auth/client";

import { Menu, Transition } from "@headlessui/react";

import { HiChevronDown } from "react-icons/hi";

const MainNav = () => {
  const [session, loading] = useSession();

  const navItems = ["Features", "Events", "Servers"];

  return (
    <nav className="flex items-center justify-between my-4">
      <div className="text-2xl font-bold">
        <Link href="/">Event Bot</Link>
      </div>
      <div className="flex items-center">
        <ul className="flex">
          {navItems.map((item) => (
            <li
              key={item}
              className="mx-2 text-lg hover:text-gray-400 duration-200"
            >
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>
        <div className="ml-5">
          {!session && (
            <button onClick={() => signIn("discord")} className="btn-primary">
              Log In
            </button>
          )}
          {session?.user && (
            <Menu as="div" className="relative">
              <Menu.Button className="select-none cursor-pointer flex items-center">
                {session.user?.image && (
                  <div>
                    <Image
                      className="rounded-full"
                      src={session.user.image}
                      alt="avatar"
                      width={32}
                      height={32}
                      layout="fixed"
                    />
                  </div>
                )}
                <p className="text-lg font-semibold ml-2 mx-1">
                  {session.user.name}
                </p>
                <HiChevronDown className="text-2xl" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="duration-200"
                enterFrom="-translate-y-5 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="duration-200"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-5 opacity-0"
              >
                <Menu.Items className="absolute mt-2 right-0 w-40 origin-top divide-y divide-gray-700 bg-gray-800 rounded-md shadow">
                  <div className="px-1 py-1 flex flex-col items-strech">
                    <Menu.Item>
                      <Link href="/servers/@me">
                        <a className="p-2 text-right text-md rounded-md hover:bg-gray-700 duration-200">
                          My Servers
                        </a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/events/@me">
                        <a className="p-2 text-right text-md rounded-md hover:bg-gray-700 duration-200">
                          My Events
                        </a>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1 flex flex-col items-stretch">
                    <Menu.Item>
                      <button
                        onClick={() => signOut()}
                        className="p-2 text-right text-md rounded-md hover:bg-gray-700 duration-200"
                      >
                        Log Out
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
