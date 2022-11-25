import SettingsLinks from "../../../../components/SettingsLinks";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import styles from "../Settings.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TextLoading from "../../../../components/TextLoading";

const Reports = () => {

  const [bitacora, setBitacora] = useState();
  const [report, setReport] = useState();
  const [dateStart, setDateStart] = useState(new Date(new Date().setDate(new Date().getDate() - 30)).toJSON().slice(0, 10));
  const [dateEnd, setDateEnd] = useState(new Date().toJSON().slice(0, 10));


  const getReport = () => {
    axios.get(`/api/reports?dstart=${dateStart}&dend=${dateEnd}`)
      .then(({ data }) => {
        setReport(data.report)
        setBitacora(data.logs)
      })
      .catch(() => {
        setReport({})
        setBitacora([])
      })
  }

  useEffect(() => {
    getReport()
  }, [])

  const ShowList = () => {

    if (!bitacora) {
      return <tr>
        <td><TextLoading /></td>
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
      <td>{el.createdAt.slice(0, 10)} {el.createdAt.slice(11, 16)}</td>
    </tr>
    )
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <div className={styles.reports}>
          <h3>Reportes</h3>
          <div className={styles.customSearch}>
            <Input type="date" description="" value={dateStart} onChange={setDateStart} title="Desde" />
            <Input type="date" description="" value={dateEnd} onChange={setDateEnd} title="hasta" />
            <Button title="Buscar" onClick={getReport} />
            <Button title="Descargar" color="orange" />
          </div>
          <div className={styles.reportBoxes}>
            {report && report['POST'] && <>
              <div className={styles.reportBox + " PURPLE"}><p>Publicaciones realizadas</p><p>{report['POST']['CREATE'] || "X"}</p></div>
              <div className={styles.reportBox + " RED"}><p>Publicaciones eliminadas</p><p>{report['POST']['DELETE'] || "X"}</p></div>
              <div className={styles.reportBox + " ORANGE"}><p>Publicaciones editadas</p><p>{report['POST']['UPDATE'] || "X"}</p></div>
            </>}
          </div>
        </div>
        <hr />
        <div className={styles.top}>
          <h3>Bitacora</h3>

        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>MODULO</th>
              <th>ACCION</th>
              <th>ENTIDAD</th>
              <th>USUARIO</th>
              <th>FECHA</th>
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
