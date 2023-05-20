import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/checkoutprocess.module.css";

function Checkoutprocess() {
  useEffect(() => {
    const savedEventJSON = sessionStorage.getItem("savedEvent");

    if (savedEventJSON !== null) {
    
    const getEvent = sessionStorage.getItem("savedEvent");
    const showGetEvent = JSON.parse(getEvent);

    const date = showGetEvent.date;
    const eventname = showGetEvent.eventname;
    const location = showGetEvent.location;
    const price = showGetEvent.price;
    const row = showGetEvent.row;
    const seat = showGetEvent.seat;
    const section = showGetEvent.section;
    const imgurl = showGetEvent.imgurl;

    document.querySelector(".showdate").innerHTML = date;
    document.querySelector(".showevent").innerHTML = eventname;
    document.querySelector(".showlocation").innerHTML = location;
    document.querySelector(".showprice").innerHTML = price;
    document.querySelector(".showrow").innerHTML = row;
    document.querySelector(".showseat").innerHTML = seat;
    document.querySelector(".showsection").innerHTML = section;
    document.querySelector(".showimgurl").innerHTML = imgurl;

    } else {
     window.location = "/"
    }
  });
        
  return (
    <div className={styles.checkoutprocess}>
      <div>
        <p className='showdate'></p>
        <p className='showevent'></p>
        <p className='showlocation'></p>
        <p className='showprice'></p>
        <p className='showrow'></p>
        <p className='showseat'></p>
        <p className='showsection'></p>
        <p className='showimgurl'></p>
      </div>
    </div>
  );
}

export default Checkoutprocess;
