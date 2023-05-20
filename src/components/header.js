import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import teams from "../../public/teams";
import Logo from "../assets/img/logo.png";
import resetIco from "../assets/icons/reset.svg";
import userIco from "../assets/icons/signin.svg";
import languageIco from "../assets/icons/language.svg";
import hamburgerIco from "../assets/icons/hamburger.svg";
import closeIco from "../assets/icons/white-close.svg";


function Header() {
  useEffect(() => {
    checkEvent();

    function checkScreenWidth() {
      if (window.innerWidth > 550) {
        document.querySelector(".hamburger").style.display = "block";
        document.querySelector(".hamburgermenu").classList.remove("closehamburger");
        document.querySelector(".hamburgermenu").classList.remove("openhamburger");
      } else {
       document.querySelector(".hamburger").style.display = "none";
      }
    }

    window.addEventListener("resize", checkScreenWidth);
    
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

  function openHamburger(){
    document.querySelector("body").classList.add("noscroll");
    document.querySelector(".hamburger").style.display = "block";
    document.querySelector(".hamburgermenu").classList.remove("closehamburger");
    document.querySelector(".hamburgermenu").classList.add("openhamburger");
  }

  function closeHamburger(){
    document.querySelector("body").classList.remove("noscroll");
    document.querySelector(".hamburgermenu").classList.add("closehamburger");
    document.querySelector(".hamburgermenu").classList.remove("openhamburger");  
    
    setTimeout(() => {
      document.querySelector(".hamburger").style.display = "none";
    }, 300);

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
      <div className="headercontent">

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

        <section className="hamburger">
          <div className="hamburgermenu">
            <Link href="#"><Image src={userIco} alt="Sign in icon"/> Sign In</Link>
            <Link href="#"><Image src={languageIco} alt="Language icon"/> En</Link>
          </div>
          <div onClick={closeHamburger}>
            <div>
              <Image src={closeIco} alt="Close Icon"/>
            </div>
          </div>
        </section>

        <button onClick={openHamburger}><Image src={hamburgerIco} alt="Hamburger Menu Icon"/></button>

      </div>
    </header>
  );
}

export default Header;
