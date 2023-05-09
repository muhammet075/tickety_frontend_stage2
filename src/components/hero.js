import Image from "next/image";
import Link from "next/link";
import styles from "../styles/hero.module.css";
import whatsappIco from "../assets/icons/whatsapp.svg";
import instagramIco from "../assets/icons/instagram.svg";
import linkedinIco from "../assets/icons/linkedin.svg";
import facebookIco from "../assets/icons/facebook.svg";
import twitterIco from "../assets/icons/twitter.svg";


function Hero() {
  return (
    <div className={styles.hero}>
      <h1>Changing the way people<br/> experience <span>Live Events</span></h1>
      <p>Tickets to the most spectacular sporting events in the world with exclusive discounts.</p>
      
      <section>
        <Link href="#">Signup for Tickety Rewards!</Link>
      </section>

      <section>
        <Link href="#">Sign up for Tickety</Link>
        <Link href="#">Or talk to us now <span><Image src={whatsappIco} alt="WhatsApp Icon"/></span></Link>
      </section>

      <section>
        <ul>
            <li><Link href="#"><Image src={instagramIco} alt="Instagram Icon"/></Link></li>
            <li><Link href="#"><Image src={linkedinIco} alt="Linkedin Icon"/></Link></li>
            <li><Link href="#"><Image src={facebookIco} alt="Facebook Icon"/></Link></li>
            <li><Link href="#"><Image src={twitterIco} alt="Twitter Icon"/></Link></li>
        </ul>  
      </section>
    </div>
  );
}

export default Hero;
