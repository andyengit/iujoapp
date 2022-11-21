import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import TextLoading from "../../../../components/TextLoading";
import useNotification from "../../../../hooks/useNotification"
import UploadFile from "../../../../components/UploadFile";

const Accounts = () => {

  const { setNotification } = useNotification()

  const { dataUser } = useAuth();
  const [users, setUsers] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [servicesUser, setServicesUser] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [group, setGroup] = useState(2);
  const [image, setImage] = useState("");

  const handleSelect = (username) => {
    axios.get(`/api/users/${username}`)
      .then(({ data }) => {
        setUserSelected(data);
        setServicesUser(data.UsersServices);
        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
        setGroup(data.group.id);
      })
  }

  const getUsers = () => {
    axios.get(`/api/users`)
      .then(({ data }) => {
        setUsers(data.rows);
      })
  }


  useEffect(() => {
    getUsers();
  }, [])

  const handleStatus = (el) => {
    axios.put(`/api/users/${el.username}`, { status: !el.status })
      .then(({ data }) => {
        getUsers();
      })
      .catch(err => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  const handleUpdate = () => {
    let newData = {}
    if (name !== userSelected.name) {
      newData.name = name;
    }
    if (password !== "") {
      newData.password = password;
    }

    if (group !== userSelected.group.id) {
      newData.groupId = group;
    }
    if(image !== ""){
      newData.image = image
    }

    if (password !== passwordConfirm) {
      setNotification("Las contraseñas no coinciden", "ERROR")
      return false
    }

    axios.put(`/api/users/${userSelected.id}`, newData)
      .then(({ data }) => {
        setNotification(data.message)
        getUsers();
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("")
        setImage("")
        setGroup(2);
        setNewUser(false)
      })
      .catch(err => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  const handleCreate = () => {
    if (name === "" || username === "" || email === "" || password === "" || passwordConfirm === "") {
      setNotification("Todos los campos son obligatorios", "ERROR")
      return false;
    }

    if (password !== passwordConfirm) {
      setNotification("Las contraseñas no coinciden", "ERROR")
      return false;
    }

    axios.post(`/api/users`, {
      name,
      password,
      email,
      username,
      image,
      groupId: group
    })
      .then(() => {
        getUsers();
        setNewUser(false);
        setName("");
        setPassword("");
        setEmail("");
        setUsername("");
        setImage("");
        setGroup("");
      })
      .catch((err) => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  if (!dataUser) {
    return true
  }

  const ShowList = () => {

    if (!users) {
      return <tr>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
      </tr>
    }

    return users.filter(el => el.id !== 1 && el.id !== 2).map((el, index) => <tr key={index}>
      <td>{el.name}</td>
      <td>
        <Button title={"Editar"} onClick={() => { handleSelect(el.username); setNewUser(true) }} />
        <Button title={el.status ? "Desactivar" : "Activar"} onClick={() => handleStatus(el)} />
      </td>
    </tr>
    )
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>Usuarios</h3>
          <Button
            title={newUser ? "-" : "+"}
            color={newUser ? "-" : "-"}
            onClick={() => {
              if (newUser) {
                getUsers();
                setName("");
                setUsername("");
                setEmail("");
                setPassword("");
                setImage("");
                setGroup(2);
                setNewUser(false);
                setUserSelected(false)
              }
              setNewUser(!newUser)
            }}
          />
        </div>
        {newUser &&
          <div className={styles.newObject}>
            <div className={styles.twoFields}>
              <Input title="Nombre" value={name} onChange={setName} />
              <Input title="Nombre de usuario" disabled={!!userSelected} value={username} onChange={setUsername} />
            </div>
            <div className={styles.twoFields}>
              <Input title="Contraseña" value={password} onChange={setPassword} />
              <Input title="Repetir Contraseña" value={passwordConfirm} onChange={setPasswordConfirm} />
            </div>
            <div className={styles.twoFields}>
              <Input title="Correo electronico" value={email} onChange={setEmail} />
              <Input title="Permisos" value={group} onChange={setGroup} type="selection" valueMap={[{ id: 1, name: "Administrador" }, { id: 2, name: "Editor" }].reverse()} />
            </div>
            <UploadFile name="Foto de perfil" setFile={setImage}/>
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
                  <td><input type="checkbox" disabled defaultChecked={el.isCoordinator} /></td>
                </tr>)}

              </tbody>
            </table>

            {userSelected ?
              <Button title={"Guardar Cambios"} color="green" onClick={handleUpdate} />
              :
              <Button title="Crear" color="green" onClick={handleCreate} />
            }
          </div>
        }
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <ShowList />
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default Accounts;
