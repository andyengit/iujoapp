import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Reports = () => {

  const [bitacora, setBitacora] = useState();

  useEffect(() => {
    axios.get(`/api/reports/`)
      .then(({ data }) => {
        setBitacora(data.logs)
      })
      .catch(err => {})
  }, [])

  console.log(bitacora)

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <h3>Bitacora</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>MODULO</th>
              <th>EVENTO</th>
              <th>Entidad</th>
              <th>USUARIO</th>
            </tr>
          </thead>
          <tbody>
            {bitacora && bitacora.map((el, index) => <tr key={index}>
              <td>{el.id}</td>
              <td>{el.module}</td>
              <td>{el.event}</td>
              <td>{el.entityId}</td>
              <td>[{el.userId}] @{el.User.username}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
