import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { Menu, Transition } from "@headlessui/react";

import { HiChevronDown, HiOutlineMenuAlt3 } from "react-icons/hi";

const MainNav = () => {
  const { data: session, status } = useSession();

  const navItems = ["Features", "Events", "Servers"];

  return (
    <nav className="flex items-center justify-between my-4 px-4 relative">
      <div className="text-2xl font-bold">
        <Link href="/">Event Bot</Link>
      </div>
      <div className="flex items-center gap-x-6">
        <ul className="hidden md:flex gap-x-2 text-lg">
          {navItems.map((item) => (
            <li key={item} className="nav-item">
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>
        <div>
          {status === "loading" && (
            <div className="flex gap-x-2 animate-pulse h-8">
              <div className="aspect-square bg-gray-700 rounded-full"></div>
              <div className="w-24 rounded bg-gray-700"></div>
            </div>
          )}
          {status === "unauthenticated" && (
            <button onClick={() => signIn("discord")} className="btn-primary">
              Login
            </button>
          )}
          {session?.user && (
            <Menu as="div" className="z-20 relative">
              <Menu.Button className="select-none cursor-pointer flex items-center duration-200 hover:bg-gray-800 px-2 py-1.5 rounded">
                {session.user?.image && (
                  <Image
                    className="rounded-full"
                    src={session.user.image}
                    alt="avatar"
                    width={32}
                    height={32}
                    layout="fixed"
                  />
                )}
                <p className="hidden sm:block text-lg font-semibold ml-2 mx-1">
                  {session.user.name}
                </p>
                <HiChevronDown className="text-2xl" />
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
                <Menu.Items className="dropdown w-40">
                  <div className="p-1 flex flex-col">
                    <Menu.Item
                      as="a"
                      href="/servers/@me"
                      className="dropdown-item"
                    >
                      My Servers
                    </Menu.Item>
                    <Menu.Item
                      as="a"
                      href="/events/@me"
                      className="dropdown-item"
                    >
                      My Events
                    </Menu.Item>
                  </div>
                  <div className="p-1 flex flex-col">
                    <Menu.Item>
                      <button
                        onClick={() => signOut()}
                        className="p-2 text-right text-red-400 text-md rounded-md hover:bg-gray-700 duration-200"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
        <Menu>
          <Menu.Button as="button" className="md:hidden">
            <HiOutlineMenuAlt3 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 text-2xl text-gray-400 cursor-pointer" />
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
            <Menu.Items className="absolute top-full mt-4 py-2 px-8 left-0 focus:outline-none origin-top divide-y divide-gray-800 bg-gray-900 rounded-b-md shadow-lg w-full">
              {navItems.map((navItem) => (
                <div key={navItem} className="p-1 flex flex-col items-strech">
                  <Menu.Item
                    as="a"
                    href={`/${navItem.toLowerCase()}`}
                    className="px-2 py-1.5 text-left text-lg"
                  >
                    {navItem}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default MainNav;
