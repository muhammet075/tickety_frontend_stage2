import Image from "next/image";
import Link from "next/link";
import styles from "../styles/partners.module.css";
import formula1Logo from "../assets/logos/formula1-gray.svg";
import nbaLogo from "../assets/logos/nba-gray.svg";
import formulaeLogo from "../assets/logos/formulae-gray.svg";
import nhlLogo from "../assets/logos/nhl-gray.png";
import mlbLogo from "../assets/logos/mlb-gray.svg";

function Partners() {
  return (
    <div className={styles.partners}>
      <div>
        <h2>The biggest leagues and world championships are here</h2>

        <section>
          <Image src={formula1Logo} alt='Logo of Formula 1' />
          <Image src={nbaLogo} alt='Logo of NBA' />
          <Image src={formulaeLogo} alt='Logo of Formula E' />
          <Image src={nhlLogo} alt='Logo of NHL' />
          <Image src={mlbLogo} alt='Logo of MLB' />
        </section>
      </div>
    </div>
  );
}

export default Partners;
