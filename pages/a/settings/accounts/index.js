import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import PopUp from "../../../../components/PopUp";
import Button from "../../../../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
const Accounts = () => {

  const { dataUser } = useAuth();
  const [users, setUsers] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [servicesUser, setServicesUser] = useState(false);

  const handleSelect = (username) => {
    axios.get(`/api/users/${username}`)
      .then(({ data }) => {
        setUserSelected(data.user);
        setServicesUser(data.user.UsersServices);
        setPopUp(true);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get(`/api/users`)
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  if (!dataUser) {
    return true
  }

  const PopUser = () => {
    return (<div className={styles.form}>
      <div className={styles.twoFields}>
        <Input title={"Nombre"} defaultValue={userSelected.name} />
        <Input title={"Correo"} defaultValue={userSelected.email} />
      </div>
      <div className={styles.twoFields}>
        <Input title={"Nombre de usuario"} defaultValue={userSelected.username} />
        <Input title={"Contraseña"} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Permiso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Es administrador</td>
            <td><input type="checkbox" defaultChecked={userSelected.group.isAdmin} /></td>
          </tr>
        </tbody>
      </table>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Servicios</th>
            <th>Coordinador</th>
          </tr>
        </thead>
        <tbody>
          {userSelected && userSelected.UsersServices.map((el, index) => <tr key={index}>
            <td>{el.users.name}</td>
            <td><input type="checkbox" defaultChecked={el.isCoordinator} /></td>
          </tr>)}

        </tbody>
      </table>
      <Button title={"Guardar Cambios"} color="green" />
    </div>)
  }

  return (
    <div className={styles.container}>
      {popUp && <PopUp children={PopUser} closePopUp={() => setPopUp(false)} type={""} />}

      <SettingsLinks />
      <div className={styles.content}>
        <h3>Usuarios</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users && users.filter(el => el.id !== 1).map((el, index) => <tr key={index}>
              <td>{el.name}</td>
              <td><Button title={"Editar"} onClick={() => handleSelect(el.username)} /></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default Accounts;
