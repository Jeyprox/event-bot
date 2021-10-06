import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { signIn, signOut, useSession } from "next-auth/client";

import { Menu, Transition } from "@headlessui/react";

import { HiChevronDown, HiOutlineMenuAlt3 } from "react-icons/hi";

const MainNav = () => {
  const [session, loading] = useSession();

  const navItems = ["Features", "Events", "Servers"];

  return (
    <nav className="flex items-center justify-between my-4 px-4">
      <div className="text-2xl font-bold">
        <Link href="/">Event Bot</Link>
      </div>
      <div className="flex items-center">
        <ul className="hidden md:flex">
          {navItems.map((item) => (
            <li
              key={item}
              className="mx-4 text-lg hover:text-gray-400 duration-200"
            >
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>
        <div className="ml-6">
          {!session && (
            <button onClick={() => signIn("discord")} className="btn-primary">
              Login
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
                enter="duration-300"
                enterFrom="-translate-y-5 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="duration-300"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-5 opacity-0"
              >
                <Menu.Items className="dropdown w-40">
                  <div className="px-1 py-1 flex flex-col items-strech">
                    <Menu.Item>
                      <Link href="/servers/@me">
                        <a className="dropdown">My Servers</a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/events/@me">
                        <a className="dropdown-item">My Events</a>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1 flex flex-col items-stretch">
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
        <Menu as="div" className="z-10 ml-6">
          <Menu.Button>
            <HiOutlineMenuAlt3 className="md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 text-2xl text-gray-400 cursor-pointer" />
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
            <Menu.Items className="absolute mt-4 py-2 px-8 left-0 focus:outline-none origin-top divide-y divide-gray-800 bg-gray-900 rounded-b-md shadow-lg w-full">
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
