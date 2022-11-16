import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import TextLoading from "../../../../components/TextLoading";
import useNotification from "../../../../hooks/useNotification";
import {useRouter} from "next/router"

const Careers = () => {

  const colors = [{ name: 'AZUL', id: "BLUE" }, { name: 'ROJO', id: "RED" }]

  const router = useRouter();
  const { setNotification } = useNotification();
  const { dataUser } = useAuth();
  const [careers, setCareers] = useState(false);
  const [newCareer, setNewCareer] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("BLUE");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState("");

  const getCareers = () => {
    axios.get(`/api/careers`)
      .then(({ data }) => {
        setCareers(data.rows);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getCareers()
  }, [])

  if (!dataUser) {
    return true
  }

  const createCareer = () => {
    if (
      name === ""
      || path === ""
      || description === ""
      || profile === ""
      || color === "") {
      setNotification("Todos los campos son obligatorios", "ERROR")
      return true
    }
    axios.post('/api/careers/', {
      name,
      path,
      color,
      description,
      profile,
      pensum: "",
    })
      .then(({ data }) => {
        getCareers()
        setNotification(data.message)
        setName("");
        setPath("");
        setColor("");
        setDescription("");
        setProfile("");
      })
      .catch((error) => {
        setNotification(error.response.data.message, "ERROR")
      })
  }

  const deleteCareer = (el) => {
    axios.put(`/api/careers/${el.id}`,{
      status: !el.status
    })
      .then(() => {
        getCareers()
      })
      .catch((error) => {
        setNotification(error.response.data.response, "ERROR")
      })
  }

  const ShowList = () => {

    if (!careers) {
      return <tr>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
      </tr>
    }

    return careers.map((el, index) => <tr key={index}>
      <td>{el.name}</td>
      <td>{el.color}</td>
      <td>/c/{el.path}</td>
      <td>
        <Button title="VER" onClick={() => router.push(`/c/${el.path}`)}/>
        <Button title={el.status ? "DESACTIVAR" : "ACTIVAR"} color="red" onClick={() => deleteCareer(el)} />
      </td>
    </tr>
    )
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>Carreras</h3>
          <Button
            title={newCareer ? "-" : "+"}
            color={newCareer ? "-" : "-"}
            onClick={() => setNewCareer(!newCareer)}
          />
        </div>
        {newCareer &&
          <div className={styles.newObject}>
            <div className={styles.twoFields}>
              <Input title="Nombre" value={name} onChange={setName} />
              <Input title="Path" value={path} onChange={setPath} />
            </div>
            <textarea placeholder="Descripcion"  value={description} type="textarea" onChange={({ target }) => setDescription(target.value)} />
            <textarea placeholder="Perfil del egresado" value={profile} type="textarea" onChange={({ target }) => setProfile(target.value)} />
            <Input title="Color" type="selection" valueMap={colors} value={color} onChange={setColor} />
            <Button title="Crear" color="green" onClick={createCareer} />
          </div>
        }
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>COLOR</th>
              <th>PATH</th>
              <th>ACCIONES</th>
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

export default Careers;
