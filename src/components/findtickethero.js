import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/findtickethero.module.css";
import instagramIco from "../assets/icons/instagram.svg";
import linkedinIco from "../assets/icons/linkedin.svg";
import facebookIco from "../assets/icons/facebook.svg";
import twitterIco from "../assets/icons/twitter.svg";
import searchIco from "../assets/icons/search.svg";

function Findtickethero() {
  useEffect(() => {

    const storedEvents = JSON.parse(sessionStorage.getItem("events"));

    if (storedEvents) {
      createTickets();

    } else {
      console.log("Events bestaat niet.");
    }

  });

  function searchTickets() {

    const teamApiName = document.querySelector(".teamtype").value;

    sessionStorage.setItem("teamname", teamApiName);

    let apiLink;


    if (teamApiName === "arizonacardinals") {
      apiLink = process.env.NEXT_PUBLIC_ARIZONACARDINALS;
    } else if (teamApiName === "atlantafalcons") {
      apiLink = process.env.NEXT_PUBLIC_ATLANTAFALCONS;
    } else if (teamApiName === "baltimoreravens") {
      apiLink = process.env.NEXT_PUBLIC_BALTIMORERAVENS;
    }

    async function getData() {
      const response = await fetch(apiLink);
      const jsondata = await response.json();
      const events = [];

      jsondata._embedded.events.forEach(function (event) {
        const eventData = {
          event_name: event.name,
          team_name: event._embedded.attractions[0].name,
          date: event.dates.start.localDate,
          time: event.sales.public.startDateTime,
          location: event._embedded.venues[0].name,
        };
        events.push(eventData);
      });

      sessionStorage.setItem("events", JSON.stringify(events));
    }

    getData();
    createTickets();
  }

  function createTickets(){

    setTimeout(function () {

      document.querySelector(".searchcontainer").classList.add("displaynone");
      const storedEvents = JSON.parse(sessionStorage.getItem("events"));

      console.log(storedEvents);

      console.log("storedEvents", storedEvents);

      let html = "";

      for (let i = 0; i < Math.min(storedEvents.length, 7); i++) {

      let randomSection;

      const teamName = sessionStorage.getItem("teamname");

      if (teamName === "baltimoreravens"){ 
        const randomNumber = Math.floor(Math.random() * 3);
        if (randomNumber === 0) {
          randomSection = String(Math.floor(Math.random() * 54) + 500);
        } else if (randomNumber === 1) {
          randomSection = String(Math.floor(Math.random() * 54) + 200);
        } else {
          randomSection = String(Math.floor(Math.random() * 54) + 100);
        }

      } else if (teamName === "atlantafalcons"){
      const randomNumber = Math.floor(Math.random() * 3);
      if (randomNumber === 0) {
        randomSection = String(Math.floor(Math.random() * 50) + 301);
      } else if (randomNumber === 1) {
        randomSection = String(Math.floor(Math.random() * 47) + 201);
      } else {
        randomSection = String(Math.floor(Math.random() * 36) + 101);
      }

      } else if (teamName === "arizonacardinals"){
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0) {
        randomSection = String(Math.floor(Math.random() * 48) + 201);
      } else {
        randomSection = String(Math.floor(Math.random() * 26) + 119);
      }
      }
  
      const randomRow = String(Math.floor(Math.random() * 20) + 1).padStart(2, '0');
      const randomSeats = String(Math.floor(Math.random() * 18) + 1).padStart(2, '0');
      const randomSeatsSecond = String(Number(randomSeats) + 1).padStart(2, "0");
      const randomPrice = Math.floor(Math.random() * 1026) + 175; // Genereer een willekeurig nummer tussen 175 en 1200

      let priceRatio = randomPrice / parseInt(randomSection); // Prijsverhouding

        html += `
          <div class="card">
            <p>${storedEvents[i].date} ${storedEvents[i].time}</p>
            <p>${storedEvents[i].location}</p>
            <p>${storedEvents[i].team_name}</p>
            <h2>${storedEvents[i].event_name}</h2>
            <p>Section: <span class="sectionnumber">${randomSection}</span></p>
            <p>Row: ${randomRow}</span></p>
            <p>Seat: ${randomSeats} and ${randomSeatsSecond}</p>
            <br/>
            <p>$ ${randomPrice}.00 </p>
            <button type="button" onclick="alert('test')">Buy</button>
          </div>
        `;
        html += "";
        document.querySelector(".ticketresults").classList.remove("displaynone");
        document.querySelector(".herosocials").classList.add("displaynone");
        document.querySelector(".ticketshero").classList.add("nobackgroundimage");
        document.querySelector(".cards-box").innerHTML = html;
        window.scrollTo({ top: 0, behavior: "smooth" });

      }
      loopTickets();
      putSectionBackgrounds();
    }, 500);

  }

  function putSectionBackgrounds(){

    let sectionNumbers = document.querySelectorAll(".sectionnumber");
    let rowNumbers = document.querySelectorAll(".rownumber");
    const teamName = sessionStorage.getItem("teamname");

    for (let i = 0; i < sectionNumbers.length; i++) {
      console.log(sectionNumbers[i].parentElement.parentElement);
      let backgroundUrl = 'url("/nfl-seat-backgrounds/' + teamName + '/section_section-' +  sectionNumbers[i].innerHTML + '.jpg")';

      sectionNumbers[i].parentElement.parentElement.style.backgroundImage = backgroundUrl;
      
    }

  };

  function resetData(){
    sessionStorage.removeItem("events");
    location.reload();
  }

  function loopTickets(){
      let sliderImagesBox = document.querySelectorAll(".cards-box");
      sliderImagesBox.forEach((el) => {
        let imageNodes = el.querySelectorAll(".card:not(.hide)");
        let arrIndexes = []; 
        (() => {
          let start = 0;
          while (imageNodes.length > start) {
            arrIndexes.push(start++);
          }
        })();

        let setIndex = (arr) => {
          for (let i = 0; i < imageNodes.length; i++) {
            imageNodes[i].dataset.slide = arr[i];
          }
        };
        el.addEventListener("click", () => {
          arrIndexes.unshift(arrIndexes.pop());
          setIndex(arrIndexes);
        });
        setIndex(arrIndexes);
      });
  }


  return (
    <div className={styles.findtickethero + " ticketshero"}>
      <section className='searchcontainer'>
        <div>
          <input
            type='text'
            className='customdetails'
            placeholder='I want to attend night games only'
          ></input>
          <Image src={searchIco} alt='Seach Icon' />
        </div>
        <div>
          <button onClick={searchTickets}>Seach</button>
        </div>
      </section>

      <section className='ticketresults displaynone'>
        <div class='cards-box'></div>
        <button onClick={resetData}>Reset</button>
      </section>

      <section className="herosocials">
        <ul>
          <li>
            <Link href='#'>
              <Image src={instagramIco} alt='Instagram Icon' />
            </Link>
          </li>
          <li>
            <Link href='#'>
              <Image src={linkedinIco} alt='Linkedin Icon' />
            </Link>
          </li>
          <li>
            <Link href='#'>
              <Image src={facebookIco} alt='Facebook Icon' />
            </Link>
          </li>
          <li>
            <Link href='#'>
              <Image src={twitterIco} alt='Twitter Icon' />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Findtickethero;
