import styles from "./PrincipalCareer.module.css";
import getColor from "../../utils/getColor";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const PrincipalCareer = () => {

  const [careers, setCareers] = useState(false);

  useEffect(() => {
    axios.get(`/api/careers`)
      .then(({ data }) => {
        setCareers(data.rows);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const ShowCareers = () => {
    if (!careers) {
      return <h3>Cargando...</h3>
    }

    if (careers.length === 0) {
      return <h3>No hay carreras disponibles</h3>
    }

    return careers.map((el, index) => (
      <Link href={`/c/${el.path}`} key={index}>
        <a className={styles.career + " " + getColor[el.color]}>{el.name}</a>
      </Link>
    ))
  }

  return (
    <div className={styles.content}>
      <div className={styles.careerList}>
        <ShowCareers />
      </div>
    </div>
  );
};

export default PrincipalCareer;
