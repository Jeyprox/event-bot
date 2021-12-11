import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { FiTwitter, FiInstagram } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Menu, Transition } from "@headlessui/react";

const FooterNav = () => {
  const router = useRouter();
  const { locale, locales } = router;

  const { data: session } = useSession();
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  return (
    <>
      <div className="text-gray-200 mb-12 sm:mb-0">
        <Link href="/">
          <a className="text-3xl font-bold">EventBot</a>
        </Link>
        <ul className="flex mt-2 mb-8 text-2xl">
          <li className="mr-2 duration-200 hover:bg-gray-800 rounded">
            <a href="https://twitter.com/[TODO]">
              <FiTwitter className="m-2" />
            </a>
          </li>
          <li className="duration-200 hover:bg-gray-800 rounded">
            <a href="https://instagram.com/[TODO]">
              <FiInstagram className="m-2" />
            </a>
          </li>
        </ul>
        <Menu as="div" className="relative">
          <Menu.Button className="px-2 py-1.5 rounded-md select-none cursor-pointer flex items-center hover:bg-gray-800 duration-200">
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
            enter="duration-300"
            enterFrom="-translate-y-5 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="duration-300"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-5 opacity-0"
          >
            <Menu.Items className="dropdown-bottom w-40">
              {locales?.map((currentLocale) => (
                <div
                  className="m-1"
                  key={currentLocale}
                  onClick={() => {
                    if (currentLocale === locale) return;
                    setCookie("NEXT_LOCALE", currentLocale, { path: "/" });
                    router.push("/", "/", { locale: currentLocale });
                  }}
                >
                  <Menu.Item
                    as="div"
                    className="mt-1 p-2 cursor-pointer rounded-md duration-200 flex group hover:bg-gray-700"
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
                </div>
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
