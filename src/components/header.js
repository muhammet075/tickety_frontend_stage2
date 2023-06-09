import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import teams from "../../public/teams";
import Logo from "../assets/img/logo.png";
import resetIco from "../assets/icons/reset.svg";
import userIco from "../assets/icons/signin.svg";
import basketIco from "../assets/icons/basket.svg";
import languageIco from "../assets/icons/language.svg";
import hamburgerIco from "../assets/icons/hamburger.svg";
import closeIco from "../assets/icons/white-close.svg";
import homeIco from "../assets/icons/home.svg";


function Header() {
  useEffect(() => {
    checkEvent();

    var url = window.location.href;

    if (url.endsWith("/")) {
        document.querySelector(".filterdatasection").classList.remove("displaynone");
        document.querySelector(".resetdatasection").classList.add("displaynone");
        document.querySelector(".headercontent").classList.remove("resetheader");
    } else {
      console.log("De URL eindigt niet op '/basket'.");
    }

    let previousWindowWidth = window.innerWidth;
    let isScreenWide = false;

    function checkScreenWidth() {
      let currentWindowWidth = window.innerWidth;
      if (currentWindowWidth > 750 && !isScreenWide) {
        isScreenWide = true;
        document.querySelector(".hamburger").style.display = "block";
        document
          .querySelector(".hamburgermenu")
          .classList.remove("closehamburger");
        document
          .querySelector(".hamburgermenu")
          .classList.remove("openhamburger");
      } else if (currentWindowWidth <= 750 && isScreenWide) {
        isScreenWide = false;
        document.querySelector(".hamburger").style.display = "none";
      }
      previousWindowWidth = currentWindowWidth;
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
    sessionStorage.removeItem("savedEvent");
    window.location = "/"
  }

  function navigateMobile(event){

    let url = event.currentTarget.value;

    if (url === "home"){
      window.location = "/";
    } else if (url === "basket"){
      window.location = "/basket";
    } else if (url === "signin"){
      window.location = "/signin"
    } else {
      window.location = "/";
    }
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
          
          <input type='number' pattern="[0-9]*" className='ticketamouttype' value="2" min="1" max="8"/>
         
         <div>
          <input type='range' className='pricerange' id='priceRange' min='175' max='1200' step='1' onInput={updatePrice}/>
          <span id='selectedPrice' className='pricetype'>$ 700.00</span> 
         </div>
        </section>

        <section className="resetdatasection displaynone">
          <button className="resetbtn" onClick={resetData}><Image src={resetIco} alt="Reset Icon"/> <span>Reset</span></button>
        </section>

        <section>
          <Link href='/' className='ticketylogo'>
            <Image src={Logo} alt='Logo of Tickety' />
          </Link>
        </section>

        <section className="hamburger">
          <div className="hamburgermenu">
            <Link href="/basket"><Image src={basketIco} alt="Basket icon"/> Basket</Link>
            <Link href="/signin"><Image src={userIco} alt="Sign in icon"/> Sign In</Link>
            <Link href="#"><Image src={languageIco} alt="Language icon"/> En</Link>
            <div className="mobilemenu">
              <button value="home" onClick={navigateMobile}><Image src={homeIco} alt="Home icon"/> <span>Home</span></button>
              <button value="basket" onClick={navigateMobile}><Image src={basketIco} alt="Basket icon"/> <span>Basket</span></button>
              <button value="signin" onClick={navigateMobile}><Image src={userIco} alt="Sign in icon"/> <span>Sign In</span></button>
              <button value="language" onClick={navigateMobile}><Image src={languageIco} alt="Language icon"/> <span>En</span></button>
            </div>

          </div>
          <div className="closinghamburger" onClick={closeHamburger}>
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
