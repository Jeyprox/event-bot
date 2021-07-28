import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import navStyles from "../styles/MainNav.module.scss";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const MainNav = () => {
  const router = useRouter();
  const { locale, locales } = router;

  const [session, loading] = useSession();
  const [userDropdown, setUserDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  return (
    <nav className={navStyles.mainNav}>
      <div className={navStyles.logo}>
        <h1>Event Bot</h1>
      </div>
      <div className={navStyles.navContainer}>
        <ul className={navStyles.navList}>
          <li className={navStyles.navItem}>
            <Link href="/events">Events</Link>
          </li>
          <li className={navStyles.navItem}>
            <Link href="/servers">Servers</Link>
          </li>
          <li className={navStyles.navItem}>
            <Link href="/about">About</Link>
          </li>
        </ul>
        {session?.user && (
          <div className={navStyles.langSelection}>
            <div
              className={navStyles.langInfo}
              onClick={() => setLangDropdown(!langDropdown)}
            >
              <p>{locale?.toUpperCase()}</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {langDropdown && (
              <div className={navStyles.langDropdown}>
                {locales?.map((locale) => (
                  <p
                    key={locale}
                    onClick={() => {
                      setCookie("NEXT_LOCALE", locale, { path: "/" });
                      setLangDropdown(false);
                    }}
                  >
                    {locale.toUpperCase()}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
        <div className={navStyles.profile}>
          {!session && (
            <button onClick={() => signIn()} className="btn-primary">
              Log In
            </button>
          )}
          {session?.user && (
            <div className={navStyles.userProfile}>
              <div
                className={navStyles.userInfo}
                onClick={() => setUserDropdown(!userDropdown)}
              >
                {session.user?.image && (
                  <div className={navStyles.userAvatar}>
                    {" "}
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={32}
                      height={32}
                      layout="fixed"
                    />
                  </div>
                )}
                <p>{session.user.name}</p>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              {userDropdown && (
                <div className={navStyles.userDropdown}>
                  <Link href="/servers/me">My Servers</Link>
                  <Link href="/events/me">My Events</Link>
                  <button
                    onClick={() => signOut()}
                    className={navStyles.extraItem}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
