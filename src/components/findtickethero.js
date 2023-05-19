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
    let apiLink;

    if (teamApiName === "arizonacardinals"){
      apiLink = process.env.NEXT_PUBLIC_ARIZONACARDINALS;
    } else if (teamApiName === "atlantafalcons") {
      apiLink = process.env.NEXT_PUBLIC_ATLANTAFALCONS;
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
      const backgroundcss = storedEvents[0].team_name.replace(/\s/g, "").toLowerCase() + "-background";

      console.log("storedEvents", storedEvents);

      let html = "";

      for (let i = 0; i < Math.min(storedEvents.length, 7); i++) {
        html += `
              <div class="card ${backgroundcss}">
                <p>${storedEvents[i].date} ${storedEvents[i].time}</p>
                <p>${storedEvents[i].location}</p>
                <p>${storedEvents[i].team_name}</p>
                <h2>${storedEvents[i].event_name}</h2>
                <p>From $54</p>
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
    }, 500);

  }


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
