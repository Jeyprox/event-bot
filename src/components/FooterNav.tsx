import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

import footerStyles from "../styles/FooterStyles.module.scss";

import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { CSSTransition } from "react-transition-group";

const FooterNav = () => {
  const transitionRef = useRef(null);
  const router = useRouter();
  const { locale, locales } = router;

  const [session, loading] = useSession();
  const [langDropdown, setLangDropdown] = useState(false);
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  return (
    <>
      <div className={footerStyles.footerInfo}>
        <Link href="/">EventBot</Link>
        <ul className={footerStyles.socialList}>
          <li>
            <a href="https://twitter.com/[TODO]">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/[TODO]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
        </ul>
        <div className={footerStyles.langSelection}>
          <div
            className={footerStyles.langInfo}
            onClick={() => setLangDropdown(!langDropdown)}
          >
            {locale && (
              <Image
                src={`/localeIcons/Flag${locale?.toUpperCase()}.svg`}
                alt={`Flag${locale.toUpperCase()}`}
                width={24}
                height={24}
              />
            )}

            <p>{locale?.toUpperCase()}</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={langDropdown ? footerStyles.langArrowOpen : ""}
            />
          </div>
          <CSSTransition
            nodeRef={transitionRef}
            in={langDropdown}
            timeout={250}
            classNames="drop"
            unmountOnExit
          >
            <div ref={transitionRef} className={footerStyles.langDropdown}>
              {locales?.map((currentLocale) => (
                <div
                  className={
                    currentLocale === locale ? footerStyles.activeLocale : ""
                  }
                  key={currentLocale}
                  onClick={() => {
                    setLangDropdown(false);
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
                  <p>{currentLocale.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </CSSTransition>
        </div>
      </div>
      <nav className={footerStyles.footerNav}>
        <div className={footerStyles.navSection}>
          <h2>Discover</h2>
          <ul>
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
          <div className={footerStyles.navSection}>
            <h2>Personal</h2>
            <ul>
              <li>
                <Link href="/events/@me">My Events</Link>
              </li>
              <li>
                <Link href="/servers/@me">My Servers</Link>
              </li>
            </ul>
          </div>
        )}
        <div className={footerStyles.navSection}>
          <h2>Legal</h2>
          <ul>
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
