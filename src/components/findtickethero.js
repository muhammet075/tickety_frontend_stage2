import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/findtickethero.module.css";
import instagramIco from "../assets/icons/instagram.svg";
import linkedinIco from "../assets/icons/linkedin.svg";
import facebookIco from "../assets/icons/facebook.svg";
import twitterIco from "../assets/icons/twitter.svg";
import searchIco from "../assets/icons/search.svg";
import leftIco from "../assets/icons/white-left.svg";
import rightIco from "../assets/icons/white-right.svg";
import closeIco from "../assets/icons/white-close.svg";

function Findtickethero() {
  const [sliderIndex, setSliderIndex] = useState(0);

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

      console.log("datalan", jsondata._embedded.events);

      const events = [];

      jsondata._embedded.events.forEach(function (event) {
        const eventData = {
          event_name: event.name,
          team_name: event._embedded.attractions[0].name,
          date: event.dates.start.localDate,
          time: event.dates.start.localTime,
          location: event._embedded.venues[0].name,
          city: event._embedded.venues[0].city.name,
          state: event._embedded.venues[0].state.stateCode,
        };
        events.push(eventData);
      });
      sessionStorage.setItem("events", JSON.stringify(events));
    }
    getData();
    createTickets();
  }

  function createTickets() {
    setTimeout(function () {
      document.querySelector(".resetdatasection").classList.remove("displaynone");
      document.querySelector(".filterdatasection").classList.add("displaynone");
      document.querySelector(".searchcontainer").classList.add("displaynone");
      document.querySelector(".headercontent").classList.add("resetheader");
      const storedEvents = JSON.parse(sessionStorage.getItem("events"));

      let html = "";

      for (let i = 0; i < Math.min(storedEvents.length, 7); i++) {
        let randomSection;
        const teamName = sessionStorage.getItem("teamname");

        if (teamName === "baltimoreravens") {
          const randomNumber = Math.floor(Math.random() * 3);
          if (randomNumber === 0) {
            randomSection = String(Math.floor(Math.random() * 54) + 500);
          } else if (randomNumber === 1) {
            randomSection = String(Math.floor(Math.random() * 54) + 200);
          } else {
            randomSection = String(Math.floor(Math.random() * 54) + 100);
          }
        } else if (teamName === "atlantafalcons") {
          const randomNumber = Math.floor(Math.random() * 3);
          if (randomNumber === 0) {
            randomSection = String(Math.floor(Math.random() * 50) + 301);
          } else if (randomNumber === 1) {
            randomSection = String(Math.floor(Math.random() * 47) + 201);
          } else {
            randomSection = String(Math.floor(Math.random() * 36) + 101);
          }
        } else if (teamName === "arizonacardinals") {
          const randomNumber = Math.floor(Math.random() * 2);
          if (randomNumber === 0) {
            randomSection = String(Math.floor(Math.random() * 48) + 201);
          } else {
            randomSection = String(Math.floor(Math.random() * 26) + 119);
          }
        }

        const priceRangeElement = document.querySelector(".pricerange");
        const selectedPriceRange = parseInt(priceRangeElement.value, 10);
        const maxPrice = selectedPriceRange;
        const randomPrice = Math.floor(Math.random() * (maxPrice - 175 + 1)) + 175;
        const randomRow = String(Math.floor(Math.random() * 20) + 1).padStart(2,"0");
        const randomSeats = String(Math.floor(Math.random() * 18) + 1).padStart(2,"0");
        const randomSeatsSecond = String(Number(randomSeats) + 1).padStart(2,"0");
        let priceRatio = randomPrice / parseInt(randomSection);
        const date = new Date(storedEvents[i].date);
        const month = date.toLocaleString("default", { month: "short" }).replace(/^(.)/, (c) => c.toUpperCase());
        const day = date.getDate();
        const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
        const formattedDate = `${month} ${day} - ${dayOfWeek}`;
        const timeString = storedEvents[i].time;
        const timeParts = timeString.split(":");
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        const formattedTime = time.toLocaleString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,});
        const eventName = storedEvents[i].event_name.replace(/\./g, "");
        const separators = [" vs ", " Vs ", " v "];
        let separator = null;

        for (let j = 0; j < separators.length; j++) {
          if (eventName.includes(separators[j])) {
            separator = separators[j];
            break;
          }
        }

        let flippedEventName = eventName;
        if (separator) {
          const teams = eventName.split(separator);
          const homeTeam = teams[0].trim();
          const awayTeam = teams[1].trim();
          flippedEventName = `${awayTeam} ${separator.trim()} ${homeTeam}`;
        }

        console.log(flippedEventName);

        html += `
          <div class="card">
            <div>
              <section>
                <p>${formattedDate} ${formattedTime}</p>
                <p>${storedEvents[i].location} - ${storedEvents[i].city}, ${storedEvents[i].state}</p>
                <h2>${flippedEventName}</h2>
              </section>

              <section>
                <p>Section: <span class="sectionnumber">${randomSection}</span></p>
                <p>Row: ${randomRow}</span></p>
                <p>Seat: ${randomSeats} and ${randomSeatsSecond}</p>
              </section>

              <section>
                <p>$ ${randomPrice}.00 </p>
                <button type="button" class="saveeventbtn">Buy</button>
              </section>
            </div>
          </div>
        `;
        html += "";
        document.querySelector(".ticketresults") .classList.remove("displaynone");
        document.querySelector(".herosocials").classList.add("displaynone");
        document.querySelector(".resetbtn").classList.remove("displaynone");
        document.querySelector(".resetdatasection").lastElementChild.lastElementChild.innerHTML = "Reset";
        document.querySelector(".resetdatasection").lastElementChild.firstElementChild.src = "/img/reset.svg";
        document.querySelector(".ticketshero").classList.add("nobackgroundimage");
        document.querySelector(".cards-box").innerHTML = html;
        window.scrollTo({ top: 0, behavior: "smooth" });

        let allSaveBtns = document.querySelectorAll(".saveeventbtn");
        console.log(allSaveBtns);

        for (let i = 0; i < allSaveBtns.length; i++) {
          allSaveBtns[i].addEventListener("click", (e) => {
            const card = e.target.parentElement.parentElement;
            let row = card.children[1].children[1].innerHTML;
            let rowWord = row.split(" ");
            rowWord.shift();
            let newRow = rowWord.join(" ");
            let seat = card.children[1].children[2].innerHTML;
            let seatWord = seat.split(" ");
            seatWord.shift();
            let newSeat = seatWord.join(" ");

            const savedEvent = {
              date: card.firstElementChild.firstElementChild.innerHTML,
              location: card.firstElementChild.children[1].innerHTML,
              eventname: card.firstElementChild.children[2].innerHTML,
              section: card.children[1].children[0].firstElementChild.innerHTML,
              row: newRow,
              seat: newSeat,
              price: card.children[2].children[0].innerHTML,
              imgurl: card.parentElement.style.backgroundImage,
            };

            const savedEventJSON = JSON.stringify(savedEvent);
            sessionStorage.setItem("savedEvent", savedEventJSON);

            window.location = "/basket";
          });
        }
      }
      loopTickets();
      putSectionBackgrounds();
      updateCardTransforms(sliderIndex);
    }, 500);
  }
  
  function putSectionBackgrounds() {
    let sectionNumbers = document.querySelectorAll(".sectionnumber");
    let rowNumbers = document.querySelectorAll(".rownumber");
    const teamName = sessionStorage.getItem("teamname");
    for (let i = 0; i < sectionNumbers.length; i++) {
      let backgroundUrl =
        'url("/nfl-seat-backgrounds/' +
        teamName +
        "/section_section-" +
        sectionNumbers[i].innerHTML +
        '.jpg")';
      sectionNumbers[
        i
      ].parentElement.parentElement.parentElement.parentElement.style.backgroundImage =
        backgroundUrl;
    }
  }

  function loopTickets() {
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


  

    function prevTickets() {
      const cards = document.querySelectorAll(".cards-box .card");
      const currentIndex = Array.from(cards).findIndex(
        (card) => card.getAttribute("data-slide") === "0"
      );
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;

      cards.forEach((card, i) => {
        const slideValue = Math.abs(i - prevIndex);
        card.setAttribute("data-slide", slideValue);
      });
    }

    function nextTickets() {
      const cards = document.querySelectorAll(".cards-box .card");
      const currentIndex = Array.from(cards).findIndex(
        (card) => card.getAttribute("data-slide") === "0"
      );
      const nextIndex = (currentIndex + 1) % cards.length;

      cards.forEach((card, i) => {
        const slideValue = Math.abs(i - nextIndex);
        card.setAttribute("data-slide", slideValue);
      });
    }

    function updateCardTransforms(index) {
      const cards = document.querySelectorAll(".cards-box .card");

      cards.forEach((card, i) => {
        const slideValue = Math.abs(i - index);
        card.setAttribute("data-slide", slideValue);
      });
    }

    function changeTicketsViews(){
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector(".cards-box").classList.add("changeticketsview");
      document.querySelector(".changeticketviesbtn").classList.add("displaynone");
      document.querySelector(".buttonsnavigation").classList.add("displaynone");
      document.querySelector(".closechangedview").classList.remove("displaynone"); 
    }

  function closeChangedView(){
      document.querySelector(".cards-box").classList.remove("changeticketsview");
      document.querySelector(".changeticketviesbtn").classList.remove("displaynone");
      document.querySelector(".buttonsnavigation").classList.remove("displaynone");  
      document.querySelector(".closechangedview").classList.add("displaynone"); 
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
        
        <button onClick={closeChangedView} className="closechangedview displaynone"><Image src={closeIco} alt="Close Icon"/></button>
        <div class='cards-box'></div>
        <div className="buttonsnavigation">
          <button onClick={nextTickets} className='next-button'><Image src={leftIco} alt="Left icon"/></button>
          <button onClick={changeTicketsViews} className="changeticketviesbtn">8 Events</button>
          <button onClick={prevTickets} className='prev-button'><Image src={rightIco} alt="Right icon"/></button>
        </div>
      </section>

      <section className='herosocials'>
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
