import SettingsLinks from "../../../../components/SettingsLinks";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import styles from "../Settings.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TextLoading from "../../../../components/TextLoading";

const Reports = () => {

  const [bitacora, setBitacora] = useState();

  useEffect(() => {
    axios.get(`/api/reports/`)
      .then(({ data }) => {
        setBitacora(data.logs)
      })
      .catch(err => { })
  }, [])

  const ShowList = () => {

    if (!bitacora) {
      return <tr>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
      </tr>
    }

    return bitacora.map((el, index) => <tr key={index}>
      <td>{el.id}</td>
      <td>{el.module}</td>
      <td>{el.event}</td>
      <td>{el.entity}</td>
      <td>[{el.userId}] @{el.User.username}</td>
    </tr>
    )
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>Bitacora</h3>
          <div className={styles.customSearch}>
            <Input type="date" description="" title="Desde" />
            <Button title="Buscar" />
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>MODULO</th>
              <th>EVENTO</th>
              <th>ENTIDAD</th>
              <th>USUARIO</th>
            </tr>
          </thead>
          <tbody>
            <ShowList />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
