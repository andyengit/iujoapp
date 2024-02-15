import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
import { useState, useEffect } from "react"
import axios from 'axios'

const Footer = () => {

  const [elements, setElements] = useState([])

  useEffect(() => {
    axios.get(`/api/events`)
      .then(({ data }) => {
        setElements(data.rows.filter(el => el.status).slice(0, 3));
      })
  }, [])

  return (
    <footer className={styles.footer}>
      <div>
        <Image
          src={"/base/logo.png"}
          priority
          objectFit="contain"
          height="65.25"
          width={"208,25"}
          alt="Marca Logo"
        />
      </div>
      <ul>
        <li>
          <Link href="/auth/login">
            <a>CMS - Sistema</a>
          </Link>
        </li>
        <li>
          <Link href="/p">
            <a>Noticias</a>
          </Link>
        </li>
        <li>
          <Link href="/aboutus">
            <a>Conocenos</a>
          </Link>
        </li>
      </ul>
      <ul>
        {elements.length > 0 && elements.map((el, index) => (
          <li key={index}>
            <Link href={el.url}>
              <a>{el.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
