import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Logo from "../assets/img/logo.png";
import teams from "../../public/teams";
import resetIco from "../assets/icons/reset.svg";


function Header() {
  useEffect(() => {
    checkEvent();
  });

  function checkEvent(){
    const eventSelect = document.querySelector(".eventtype");
    const selectedEvent = eventSelect.value;

    if (selectedEvent === "nfl") {
      document.querySelector(".teamtype").innerHTML = "";
      teams.NFL.forEach(function (team) {
        const option = document.createElement("option");
        option.value = team.replace(/\s/g, "").toLowerCase();;
        option.textContent = team;
        document.querySelector(".teamtype").appendChild(option);
      });
    } else {
      document.querySelector(".teamtype").innerHTML = "";
    }

  }

  function updatePrice() {
    const price = document.getElementById("priceRange").value;
    document.getElementById("selectedPrice").textContent = "$ " + price + ".00";
  }

  function resetData() {
    sessionStorage.removeItem("events");
    location.reload();
  }

  return (
    <header className={styles.header}>
      <div>

        <section className="filterdatasection">
          <select name='event' className='eventtype' onChange={checkEvent}>
            <option value='nfl' default>NFL</option>
            <option value='nba' disabled>NBA</option>
            <option value='mlb' disabled>MLB</option>
            <option value='nhl' disabled>NHL</option>
            <option value='mls' disabled>MLS</option>
          </select>
 
          <select name='team' className='teamtype'></select>
          
          <input type='number' className='ticketamouttype' value="2" min="1" max="8"/>
         
         <div>
          <input type='range' className='pricerange' id='priceRange' min='175' max='1200' step='1' onInput={updatePrice}/>
          <span id='selectedPrice' className='pricetype'>$ 700.00</span> 
         </div>
        </section>

        <section className="resetdatasection displaynone">
          <button onClick={resetData}><Image src={resetIco} alt="Reset Icon"/> Reset</button>
        </section>

        <section>
          <Link href='/' className='ticketylogo'>
            <Image src={Logo} alt='Logo of Tickety' />
          </Link>
        </section>

      </div>
    </header>
  );
}

export default Header;
