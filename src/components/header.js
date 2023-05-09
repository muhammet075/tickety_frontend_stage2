import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Logo from "../assets/img/logo.png";
import signinIco from "../assets/icons/signin.svg";
import langIco from "../assets/icons/language.svg";


function Header() {

  return (
    <header className={styles.header}>
        <div>
            <section>
                <ul>
                    <li><Link href="#">Sports</Link></li>
                    <li><Link href="#">Sell</Link></li>
                    <li><Link href="#">Gift Cards</Link></li>
                    <li><Link href="#">Support</Link></li>
                </ul>
            </section>

            <section>
                <Link href="/"><Image src={Logo} alt="Logo of Tickety"/></Link>
            </section>

            <section>
                <ul>
                    <li><Link href="#"><span><Image src={signinIco} alt="Sign in icon"/></span> Sign In</Link></li>
                    <li><Link href="#"><span><Image src={langIco} alt="Language icon"/></span> EN</Link></li>
                </ul>
            </section>
        </div>
    </header>
  );
}

export default Header;
