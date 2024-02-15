import Content from "./Content";
import Top from "./Top";
import styles from "./Hero.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../Button";
import {useRouter} from 'next/router'

const Hero = ({ text }) => {
  const [important, setImportant] = useState(false)
  const router = useRouter()

  useEffect(() => {
    axios.get(`/api/events`)
      .then(({ data }) => {
        if (data.rows.filter(el => el.status && el.important).length > 0) {
          setImportant(data.rows.filter(el => el.status && el.important)[0])
        }
      })
  }, [])

  return (
    <>
      {important && (<div className={styles.important}><p>{important.message}</p> <Button title="Ir ahora" color="white" onClick={() => router.push(important.url)}/></div>)}
      <section className={styles.hero}>
        <div className={styles.dataHero}>
          <Top />
          <Content text={text} />
        </div>
      </section>
    </>
  );
};

export default Hero;
