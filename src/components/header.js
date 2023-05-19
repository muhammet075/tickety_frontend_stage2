import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Logo from "../assets/img/logo.png";
import teams from "../../public/teams";


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
    var price = document.getElementById("priceRange").value;
    document.getElementById("selectedPrice").textContent = "$ " + price + ".00";
  }

  return (
    <header className={styles.header}>
      <div>

        <section>
          <select name='event' className='eventtype' onChange={checkEvent}>
            <option value='nfl' default>NFL</option>
            <option value='nba' disabled>NBA</option>
            <option value='mlb' disabled>MLB</option>
            <option value='nhl' disabled>NHL</option>
            <option value='mls' disabled>MLS</option>
          </select>
 
          <select name='team' className='teamtype'></select>
          
          <input type='number' className='ticketamouttype' value="1" min="1" max="8"/>
         
         <div>
          <input type='range' className='pricerange' id='priceRange' min='0' max='1000' step='1' onInput={updatePrice}/>
          <span id='selectedPrice' className='pricetype'>$ 500.00</span> 
         </div>
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
