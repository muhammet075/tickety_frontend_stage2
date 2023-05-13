import Image from "next/image";
import Link from "next/link";
import styles from "../styles/eventsschedule.module.css";
import nbaLogo from "../assets/logos/nba-colored.svg";
import mlbLogo from "../assets/logos/mlb-colored.svg";
import nhlLogo from "../assets/logos/nhl-colored.svg";
import arrowIco from "../assets/icons/black-arrow.svg"

function EventsSchedule() {
  return (
    <div className={styles.eventsschedule}>
        <div>

            <section>
                <p>Browse Events</p>
                <h2>See the best events and schedule</h2>
                <p>See the calendar of sporting events, add events to your calendar and don't miss out on historic and memorable sports moments around the world.</p>
                <Link href="/">See the full agenda</Link>

                <div>
                    <Link href="/">All Sports</Link>
                    <Link href="/">May</Link>
                    <Link href="/">Change Location</Link>
                    <Link href="/">Change Date</Link>
                </div>
            </section>

            <section>
                <div>
                    <Image src={nbaLogo} alt="Logo of NBA"/>
                    <h3>Clippers at Knicks</h3>
                    <p>Feb 4 - Madison Square Garden</p>
                    <p>From $113</p>
                    <Link href="/">Buy</Link>
                </div>
                <div>
                    <Image src={nbaLogo} alt="Logo of NBA"/>
                    <h3>Lakers at Warriors</h3>
                    <p>Feb 11 - Chase Center</p>
                    <p>From $284</p>
                    <Link href="/">Buy</Link>
                </div>
                <div>
                    <Image src={mlbLogo} alt="Logo of MLB"/>
                    <h3>Royals at Giants</h3>
                    <p>Feb 5 - Oracle Park</p>
                    <p>From $97</p>
                    <Link href="/">Buy</Link>
                </div>
                <div>
                    <Image src={nhlLogo} alt="Logo of NHL"/>
                    <h3>Eagles vs Chiefs</h3>
                    <p>Feb 12 - State Farm Stadium</p>
                    <p>From $593</p>
                    <Link href="/">Buy</Link>
                </div>
                <Link href="/">See More <Image src={arrowIco} alt="Arrow Icon"/></Link>
            </section>

        </div>
    </div>
  );
}

export default EventsSchedule;
