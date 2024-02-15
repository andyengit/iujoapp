import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";
import axios from "axios";
import useNotification from "../../../../hooks/useNotification";
import { useState } from "react";
import { useRouter } from "next/router";
import UploadFile from "../../../../components/UploadFile";

const Account = () => {

  const {setNotification} = useNotification();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();

  const { dataUser } = useAuth();

  if (!dataUser) {
    return true
  }

  const handleUpdate = () => {
    let data = {}

    if(name !== dataUser.name && name !== "") {
      data.name = name
    }
    if (password !== "") {
      data.password = password
    }
    if (passwordConfirm !== "") {
      data.passwordConfirm = passwordConfirm
    }
    if(image !== ""){
      data.image = image
    }
    if(Object.keys(data).length === 0) {
      setNotification("No se han realizado cambios", "ERROR");
      return
    }

    if(password && passwordConfirm && password !== passwordConfirm){
      setNotification("Las contraseñas no coinciden", "ERROR")
      return
    }

    axios.put(`/api/users/${dataUser.id}`, data)
      .then(({data}) => {
        setNotification(data.message)
        router.reload()
      })
      .catch(({response}) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }


  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <h3>Cuenta</h3>
        <div className={styles.twoFields}>
          <Input title={"Nombre"} only="letter" onChange={setName} defaultValue={dataUser.name} />
          <Input title={"Correo"} defaultValue={dataUser.email} disabled={true} />
        </div>
        <div className={styles.twoFields}>
        <Input title={"Nombre de usuario"} only="letter" defaultValue={dataUser.username} disabled={true} />
          <UploadFile setFile={setImage} name="Foto de perfil"/>
        </div>
        <div className={styles.twoFields}>
          <Input title={"Contraseña nueva"} onChange={setPassword} type={"password"}/>
          <Input title={"Repetir contraseña"} onChange={setPasswordConfirm} type={"password"}/>
        </div>
        <Button title="Guardar Cambios" onClick={handleUpdate} color="green"/>
      </div>
    </div>
  );
};

export default Account;
