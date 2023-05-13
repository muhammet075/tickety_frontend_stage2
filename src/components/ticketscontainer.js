import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ticketscontainer.module.css";
import formula1Logo from "../assets/logos/formula1-gray.svg";
import sendIco from "../assets/icons/send.svg";

function Ticketscontainer() {
  return (
    <div className={styles.ticketscontainer}>
      <div>

        <section>
            <p>Categories</p>
            <h2>Tickets</h2>
            <p>Choose the sports show and guarantee your ticket to see the best athletes in the world.</p>
        </section>

        <Link href='/'>
          <section>
            <div>
                <p>Tickets</p>
                <h3>NBA<br/> Basketball</h3>
                <p>See at live!</p>
            </div>
            <Image src={sendIco} alt='Send Icon' />
          </section>
        </Link>

        <Link href='/'>
          <section>
            <div>
                <p>Tickets</p>
                <h3>MLB<br/> Baseball</h3>
                <p>See at live!</p>
            </div>
            <Image src={sendIco} alt='Send Icon' />
          </section>
        </Link>

        <Link href='/'>
          <section>
            <div>
                <p>Tickets</p>
                <h3>NHL<br/> Hockey</h3>
                <p>See at live!</p>
            </div>
            <Image src={sendIco} alt='Send Icon' />
          </section>
        </Link>

        <Link href='/'>
          <section>
            <div>
                <p>Tickets</p>
                <h3>FE<br/> Formula E</h3>
                <p>See at live!</p>
            </div>
            <Image src={sendIco} alt='Send Icon' />
          </section>
        </Link>

        <Link href='/'>
          <section>
            <div>
                <p>Tickets</p>
                <h3>F1<br/> Formula 1</h3>
                <p>See at live!</p>
            </div>
            <Image src={sendIco} alt='Send Icon' />
          </section>
        </Link>
      </div>
    </div>
  );
}

export default Ticketscontainer;
