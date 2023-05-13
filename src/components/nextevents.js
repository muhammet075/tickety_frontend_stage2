import Image from "next/image";
import Link from "next/link";
import styles from "../styles/nextevents.module.css";
import nbaLogo from "../assets/logos/nba-gray.svg";

function NextEvents() {
  return (
    <div className={styles.nextevents}>
      <div>

        <section>
            <p>Browse Events</p>
            <h2>Next events</h2>
            <p>Choose the sports show and guarantee your ticket to see the best athletes in the world.</p>
        </section>

        <section>
            <div>
                <section>
                    <Image src={nbaLogo} alt="NBA Logo"/>
                    <p>Feb 18 - Sat 5:00pm</p>
                    <p>Smoothie King Center - New Orleans, LA</p>
                    <h3>Los Angeles Lakers <span>at</span><br/>New Orleans Pelicans</h3>
                    <p>From $54</p>
                    <Link href="#">Buy</Link>
                </section>
            </div>

            <div>
            </div>

        </section>

      </div>
    </div>
  );
}

export default NextEvents;
