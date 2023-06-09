import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/checkoutprocess.module.css";
import applePayIco from "../assets/icons/applepaywhite.png";
import basketIco from "../assets/icons/basket.svg";
import deleteIco from "../assets/icons/delete.png";

function Checkoutprocess() {
  useEffect(() => {
    const savedEventJSON = sessionStorage.getItem("savedEvent");
    document.querySelector(".headercontent").classList.add("resetheader");

    if (savedEventJSON !== null) {
        document.querySelector(".loadingstate").classList.remove("displaynone");
        setTimeout(function () {
            document.querySelector(".loadingstate").classList.add("displaynone");
            document.querySelector(".deletebtn").classList.remove("displaynone");
            document.querySelector(".resetdatasection").classList.remove("displaynone");
            document.querySelector(".showprice").classList.remove("displaynone");
            document.querySelector(".filterdatasection").classList.add("displaynone");
            document.querySelector(".resetdatasection").lastElementChild.lastElementChild.innerHTML = "Remove Ticket";
            document.querySelector(".resetdatasection").lastElementChild.firstElementChild.src = "/img/trash.svg";
            document.querySelector(".baskettext").innerHTML ="Select the event from the options below that you would like to purchase using Apple Pay.";

            const getEvent = sessionStorage.getItem("savedEvent");
            const showGetEvent = JSON.parse(getEvent);
            const date = showGetEvent.date;
            const eventname = showGetEvent.eventname;
            const location = showGetEvent.location;
            const row = showGetEvent.row;
            const seat = showGetEvent.seat;
            const section = showGetEvent.section;
            const imgurl = showGetEvent.imgurl;
            var amount = showGetEvent.price;
            var number = parseFloat(amount.replace("$ ", ""));
            var multiplied = number * 2;
            const price = "$ " + multiplied.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            document.querySelector(".showdate").innerHTML = date;
            document.querySelector(".showevent").innerHTML = eventname;
            document.querySelector(".showlocation").innerHTML = location;
            document.querySelector(".showprice").innerHTML = price;
            document.querySelector(".showrow").innerHTML = row;
            document.querySelector(".showseat").innerHTML = seat;
            document.querySelector(".showsection").innerHTML = section;
            document.querySelector(".backgroundeventticket").style.backgroundImage = imgurl;
            document.querySelector(".resetbtn").classList.remove("displaynone");
        }, 500);
    } else {
        document.querySelector(".baskettext").innerHTML = "There are no events in your shopping cart. Please return to the home page to add an event.";
        document.querySelector(".filledstate").classList.add("displaynone");
        document.querySelector(".filterdatasection").classList.add("displaynone");
        document.querySelector(".resetdatasection").classList.remove("displaynone");
        document.querySelector(".emptystateticket").classList.remove("displaynone");
        document.querySelector(".resetbtn").classList.add("displaynone");
    }
  });

  function deleteEvent(){
    sessionStorage.removeItem("savedEvent");
    window.location.reload();
  }

  function payFunction(){
    alert("Apple Pay process")
  }
        
  return (
    <div className={styles.checkoutprocess}>

      <div>
        <section>
          <h1>Basket</h1>
          <p className="baskettext"></p>
        </section>

        <section></section>

        <div className='checkoutticket filledstate'>
          <div>
            <div className='backgroundeventticket'>
              <p className='showprice displaynone'></p>
              <p className='showdate'></p>
              <p className='showlocation'></p>
            </div>
            <h3 className='showevent'></h3>
            <p>Row: <span className='showrow'></span></p>
            <p>Seats: <span  className='showseat'></span></p>
            <p>Section: <span className='showsection'></span></p>
            <button onClick={deleteEvent} className="deletebtn displaynone"><Image src={deleteIco} alt="Delte Icon"/></button>
            <button onClick={payFunction}><Image src={applePayIco} alt="Apple Pay Logo"/></button>
          </div>
        </div>

        <div className='checkoutticket emptystateticket displaynone'>
          <div>
            <Link href="/">
                <span>+</span>
                <span>Add an event</span>
            </Link>
          </div>
        </div>
      </div>
        
        <section className="loadingstate displaynone">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </section>

    </div>
  );
}

export default Checkoutprocess;
