import styles from "./Career.module.css";
import Button from "../../components/Button";
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import TextLoading from "../../components/TextLoading";
import getColor from "../../utils/getColor";
import useNotification from "../../hooks/useNotification";
import useAuth from "../../hooks/useAuth";
import UploadFile from "../../components/UploadFile";
import Input from "../../components/Input"

const Careers = () => {
  const user = useAuth();
  const [career, setCareer] = useState(false);
  const [edit, setEdit] = useState(false);
  const [pensum, setPensum] = useState("");
  const [color, setColor] = useState("");
  const description = useRef();
  const profile = useRef();
  const router = useRouter();
  const { setNotification } = useNotification();


  const colors = [
    { name: 'Azul', id: "BLUE" },
    { name: 'Rojo', id: "RED" },
    { name: "Purpura", id: "PURPLE" },
    { name: "Naranja", id: "ORANGE" },
    { name: "Amarillo", id: "YELLOW" },
  ]

  const getCareer = () => {
    axios.get(`/api/careers/${router.query.careerPath}`)
      .then(({ data }) => {
        setCareer(data);
        setColor(data.color)
      }).catch(err => {
        router.push('/oops')
      })
  }

  useEffect(() => {
    if (router.query.careerPath) {
      getCareer()
    }
  }, [router])

  if (!career) {
    return (
      <>
        <div className={styles.top}>...</div>
        <div className={styles.pensum}>
          <Button title="Descargar pensum" color="white" />
        </div>
        <div className={styles.content}>
          <div className={styles.description}>
            <h3 className={styles.subtitle}>Descripción</h3>
            <TextLoading />
          </div>
          <div className={styles.profile}>
            <h3 className={styles.subtitle}>Perfil del egresado</h3>
            <TextLoading />
          </div>
        </div>
      </>
    );
  }


  const handleEdit = () => {
    if (description.current.value === career.description && profile.current.value === career.profile && (pensum === "" || pensum === career.pensum) && color === career.color) {
      setEdit(false)
      return true;
    }

    let dataTo = {
      description: description.current.value,
      profile: profile.current.value
    }

    if (pensum) {
      dataTo['pensum'] = pensum
    }

    if(color){
      dataTo['color'] = color
    }

    axios.put(`/api/careers/${career.id}`, dataTo)
      .then(({ data }) => {
        setEdit(false)
        getCareer();
      })
      .catch(err => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  const ButtonEdit = () => {
    if (!user || !user.isLogged || !user.dataUser || !user.dataUser.group.isAdmin) {
      return true
    }
    if (edit) {
      return (
        <div className={styles.edit}>
          <Button title="Descartar" color="red" onClick={() => setEdit(false)} />
          <Button title="Guardar cambios" color="green" onClick={handleEdit} />
        </div>
      )
    }
    return (
      <div className={styles.edit}>
        <Button title="Editar" color="white" onClick={() => setEdit(true)} />
      </div>
    )
  }

  const ShowContentCareer = () => {
    if (edit) {
      return (
        <>
          <div className={styles.content}>
            <div className={styles.description}>
              <Input title="Color" type="selection" valueMap={colors} value={color} onChange={setColor} />
              <UploadFile name="Pensum (pdf)" setFile={setPensum} />
              <h3 className={styles.subtitle}>Descripcion</h3>
              <textarea
                className={styles.textarea}
                ref={description}
                defaultValue={career.description}
              />
            </div>
            <div className={styles.profile}>
              <h3 className={styles.subtitle}>Perfil del egresado</h3>
              <textarea
                className={styles.textarea}
                ref={profile}
                defaultValue={career.profile}
              />
            </div>
          </div>
        </>
      );
    }

    return (
      <div className={styles.content}>
        <div className={styles.description}>
          <h3 className={styles.subtitle}>Descripcion</h3>
          <p className={styles.text}>{career.description}</p>
        </div>
        <div className={styles.profile}>
          <h3 className={styles.subtitle}>Perfil del egresado</h3>
          <p className={styles.text}>{career.profile}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.top + getColor[career.color]}>{career.name}</div>
      <div className={styles.pensum}>
        <ButtonEdit />
        <Button title="Descargar pensum" onClick={() => router.push(career.pensum)} color="white" />
      </div>
      <ShowContentCareer />
    </>
  );
};

export default Careers;
