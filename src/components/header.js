import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Logo from "../assets/img/logo.png";
import signinIco from "../assets/icons/signin.svg";
import langIco from "../assets/icons/language.svg";
import hamburgerIco from "../assets/icons/hamburger.svg";
import closeIco from "../assets/icons/whiteclose.svg";

function Header() {
  useEffect(() => {
    function checkScreenWidth() {
      var screenWidth = window.innerWidth;
      if (screenWidth > 810) {
        document.querySelector("body").classList.remove("noscroll");
        document.querySelector(".ticketylogo").classList.add("displaynone");
        document.querySelector(".closehamburgermenu").classList.add("displaynone");
        document.querySelector(".ticketylogo").classList.remove("displaynone");
        document.querySelector(".hamburger").classList.remove("openhamburger");
        document.querySelector(".hamburger").classList.remove("closehamburger");
      }
    }

    window.addEventListener("resize", checkScreenWidth);
    checkScreenWidth();
  });

  function openHamburger() {
    document.querySelector("body").classList.add("noscroll");
    document.querySelector(".hamburger").classList.add("openhamburger");
    document.querySelector(".hamburger").classList.remove("closehamburger");
    document
      .querySelector(".closehamburgermenu")
      .classList.remove("displaynone");
    setTimeout(function () {
      document.querySelector(".ticketylogo").classList.add("displaynone");
    }, 550);
  }

  function closeHamburger() {
    document.querySelector("body").classList.remove("noscroll");
    document.querySelector(".hamburger").classList.add("closehamburger");
    document.querySelector(".hamburger").classList.remove("openhamburger");
    document.querySelector(".closehamburgermenu").classList.add("displaynone");
    setTimeout(function () {
      document.querySelector(".ticketylogo").classList.remove("displaynone");
    }, 100);
  }

  return (
    <header className={styles.header}>
      <div className='hamburger'>
        <div className='hamburgermenu'>
          <section>
            <ul>
              <li>
                <Link href='#'>Sports</Link>
              </li>
              <li>
                <Link href='#'>Sell</Link>
              </li>
              <li>
                <Link href='#'>Gift Cards</Link>
              </li>
              <li>
                <Link href='#'>Support</Link>
              </li>
            </ul>
          </section>

          <section>
            <Link href='/' className='ticketylogo'>
              <Image src={Logo} alt='Logo of Tickety' />
            </Link>
          </section>

          <section>
            <ul>
              <li>
                <Link href='#'>
                  <span>
                    <Image src={signinIco} alt='Sign in icon' />
                  </span>{" "}
                  Sign In
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <span>
                    <Image src={langIco} alt='Language icon' />
                  </span>{" "}
                  EN
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className='closehamburgermenu displaynone' onClick={closeHamburger}>
        <Image src={closeIco} alt='Close Icon' />
      </div>
      <button onClick={openHamburger}>
        <Image src={hamburgerIco} alt='Hamburger Menu Icon' />
      </button>
    </header>
  );
}

export default Header;
