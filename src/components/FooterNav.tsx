import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { FiTwitter, FiInstagram } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { Menu, Transition } from "@headlessui/react";

const FooterNav = () => {
  const router = useRouter();
  const { locale, locales } = router;

  const [session, loading] = useSession();
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  return (
    <>
      <div className="text-gray-200 mb-12 sm:mb-0">
        <Link href="/">
          <a className="text-3xl font-bold">EventBot</a>
        </Link>
        <ul className="flex mt-2 mb-8 text-2xl">
          <li className="mr-4 duration-200 hover:text-blue-500">
            <a href="https://twitter.com/[TODO]">
              <FiTwitter />
            </a>
          </li>
          <li className="duration-200 hover:text-blue-500">
            <a href="https://instagram.com/[TODO]">
              <FiInstagram />
            </a>
          </li>
        </ul>
        <Menu as="div" className="relative">
          <Menu.Button className="select-none cursor-pointer flex items-center">
            {locale && (
              <Image
                src={`/localeIcons/Flag${locale?.toUpperCase()}.svg`}
                alt={`Flag${locale.toUpperCase()}`}
                width={24}
                height={24}
              />
            )}

            <p className="ml-2 mr-1 text-lg font-semibold">
              {locale?.toUpperCase()}
            </p>
            <HiChevronDown className="text-lg" />
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
            <Menu.Items className="absolute mb-2 left-0 bottom-full w-40 origin-top bg-gray-800 rounded-md shadow">
              {locales?.map((currentLocale) => (
                <Menu.Item
                  as="div"
                  className="m-1 p-2 cursor-pointer rounded-md duration-200 flex group hover:bg-gray-700"
                  key={currentLocale}
                  onClick={() => {
                    if (currentLocale === locale) return;
                    setCookie("NEXT_LOCALE", currentLocale, { path: "/" });
                    router.push("/", "/", { locale: currentLocale });
                  }}
                >
                  <Image
                    src={`/localeIcons/Flag${currentLocale?.toUpperCase()}.svg`}
                    alt={`Flag${currentLocale.toUpperCase()}`}
                    width={24}
                    height={24}
                  />
                  <p className="text-md font-medium ml-2 duration-200 text-gray-300 group-hover:text-gray-200">
                    {currentLocale.toUpperCase()}
                  </p>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <nav className="flex">
        <div>
          <h2 className="text-xl uppercase font-semibold mb-2">Discover</h2>
          <ul className="text-gray-300">
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/servers">Servers</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        {session && (
          <div className="ml-16">
            <h2 className="text-xl uppercase font-semibold mb-2">Personal</h2>
            <ul className="text-gray-300">
              <li>
                <Link href="/events/@me">My Events</Link>
              </li>
              <li>
                <Link href="/servers/@me">My Servers</Link>
              </li>
            </ul>
          </div>
        )}
        <div className="ml-16">
          <h2 className="text-xl uppercase font-semibold mb-2">Legal</h2>
          <ul className="text-gray-300">
            <li>
              <Link href="/imprint">Imprint</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default FooterNav;
