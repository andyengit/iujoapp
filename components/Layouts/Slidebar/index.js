import styles from "./Slidebar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import SlidebarLinks from "../utils/links";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const Slidebar = ({ status, handleSlidebar }) => {

  const [elements, setElements] = useState([])

  useEffect(() => {
    axios.get(`/api/events`)
      .then(({ data }) => {
        setElements(data.rows.filter(el => el.status));
      })
  }, [])

  const STATUS = {
    ACTIVE: styles.slidebar + ' ' + styles.active,
    INACTIVE: styles.slidebar
  }

  const changeState = () => {
    handleSlidebar(!status)
  }

  return (<div className={status ? STATUS.ACTIVE : STATUS.INACTIVE}>
    <div className={styles.top}>
      <div className={styles.menu}>
        <AiOutlineMenu color="white" size="2rem" onClick={handleSlidebar} />
        <h3>Menu</h3>
      </div>
      {SlidebarLinks.map((link, index) => (
        <Link href={link.path} key={index}>
          <a className={styles.link} onClick={changeState}>{link.name}</a>
        </Link>))}
      {elements && elements.map((link, index) => (
        <a key={index} href={link.url} className={styles.url} onClick={changeState}>{link.name}</a>
      ))}
    </div>
    <div className={styles.bottom}>
      <Link href="/a/settings">
        <a onClick={changeState}>OPCIONES</a>
      </Link>
      <p>© 2022 IUJO. Todos los derechos reservados.</p>
    </div>
  </div>)
}

export default Slidebar;
