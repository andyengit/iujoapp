import Link from "next/link";
import styles from "./PrincipalServices.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const PrincipalServices = () => {

  const [services, setServices] = useState();

  useEffect(() => {
    axios.get(`/api/services`)
      .then(({ data }) => {
        setServices(data.rows)
      })
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.goBack}></div>
      <div className={styles.servicesList}>
        {services && services.map((el, index) => (
          <Link key={index} href={`/s/${el.path}`}>
            <a className={styles.service}>{el.name}</a>
          </Link>
        ))}
      </div>
      <div className={styles.goNext}></div>
    </div>
  );
};

export default PrincipalServices;
