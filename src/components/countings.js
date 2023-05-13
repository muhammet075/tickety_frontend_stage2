import Image from "next/image";
import Link from "next/link";
import styles from "../styles/countings.module.css";
import FiveStarsIco from "../assets/icons/5stars.svg";

function Countings() {
  return (
    <div className={styles.countings}>
      <div>
        <section>
          <h2>47M+</h2>
          <h3>Average tickets available daily in 2022</h3>
          <p>As of January 27, 2023</p>
        </section>

        <section>
          <h2>175+</h2>
          <h3>Global enterprise clients</h3>
          <p>As of January 27, 2023</p>
        </section>

        <section>
          <h2>4.9/5</h2>
          <Image src={FiveStarsIco} alt='5 Star Review' />
          <h3>#1 TrustPilot rating amongst major ticketers</h3>
          <p>As of January 27, 2023. Trustpilot.com</p>
        </section>
      </div>
    </div>
  );
}

export default Countings;
