import { useState, useRef } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import navStyles from "../styles/MainNav.module.scss";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

import { CSSTransition } from "react-transition-group";

const MainNav = () => {
  const transitionRef = useRef(null);
  const [session, loading] = useSession();
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <nav className={navStyles.mainNav}>
      <div className={navStyles.logo}>
        <Link href="/">Event Bot</Link>
      </div>
      <div className={navStyles.navContainer}>
        <ul className={navStyles.navList}>
          <li className={navStyles.navItem}>
            <Link href="/features">Features</Link>
          </li>
          <li className={navStyles.navItem}>
            <Link href="/events">Events</Link>
          </li>
          <li className={navStyles.navItem}>
            <Link href="/servers">Servers</Link>
          </li>
        </ul>
        <div className={navStyles.profile}>
          {!session && (
            <button onClick={() => signIn("discord")} className="btn-primary">
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
              <CSSTransition
                nodeRef={transitionRef}
                in={userDropdown}
                timeout={250}
                classNames="drop"
                unmountOnExit
              >
                <div ref={transitionRef} className={navStyles.userDropdown}>
                  <Link href="/servers/me">My Servers</Link>
                  <Link href="/events/me">My Events</Link>
                  <button
                    onClick={() => signOut()}
                    className={navStyles.extraItem}
                  >
                    Log Out
                  </button>
                </div>
              </CSSTransition>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
