import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import TextLoading from "../../../../components/TextLoading";
import useNotification from "../../../../hooks/useNotification"

const Events = () => {

  const { setNotification } = useNotification()

  const { dataUser } = useAuth();
  const [events, setEvents] = useState(false);
  const [eventSelected, setEventSelected] = useState(false);
  const [newEvent, setNewEvent] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [important, setImportant] = useState(0);
  const [url, setUrl] = useState("https://");

  const getEvents = () => {
    axios.get(`/api/events`)
      .then(({ data }) => {
        setEvents(data.rows.filter(el => el.status ));
      })
  }


  useEffect(() => {
    getEvents();
  }, [])

  const handleSelect = (el) => {
    setEventSelected(el);
    setName(el.name)
    setMessage(el.message)
    setImportant(el.important)
    setUrl(el.url)
    setNewEvent(true);
  }

  const handleStatus = (el) => {
    axios.put(`/api/events/${el.id}`, { status: !el.status })
      .then(() => {
        getEvents();
      })
      .catch(err => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  const handleUpdate = () => {
    let newData = {}
    if (name !== eventSelected.name) {
      newData.name = name;
    }

    if (url !== eventSelected.url) {
      newData.url = url;
    }
    
    if (message !== eventSelected.message) {
      newData.message = message;
    }

    if (important !== eventSelected.important) {
      newData.important = important;
    }

    if(Object.keys(newData).length === 0){
      setNotification("No hay ningun cambio", "ERROR")
      return
    }

    axios.put(`/api/events/${eventSelected.id}`, newData)
      .then(({ data }) => {
        setNotification(data.message)
        getEvents();
        setNewEvent(false);
        setName("");
        setUrl("https://");
        setMessage("");
        setImportant(false);
      })
      .catch(err => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  const handleCreate = () => {
    if (name === "" || url === "" || url.trim() === "https://" || url.trim() === "http://" || message === "") {
      setNotification("Todos los campos son obligatorios", "ERROR")
      return false;
    }

    axios.post(`/api/events`, {
      name,
      message,
      url,
      important,
    })
      .then(() => {
        getEvents();
        setNewEvent(false);
        setName("");
        setUrl("https://");
        setMessage("");
        setImportant(false);
      })
      .catch((err) => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  if (!dataUser) {
    return true
  }

  const ShowList = () => {

    if (!events) {
      return <tr>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
      </tr>
    }

    return events.map((el, index) => <tr key={index}>
      <td>{el.name}</td>
      <td>
        <Button title={"Editar"} onClick={() => { handleSelect(el); setNewEvent(true) }} />
        <Button title={"Desactivar"} onClick={() => handleStatus(el)} />
      </td>
    </tr>
    )
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>Eventos</h3>
          <Button
            title={newEvent ? "-" : "+"}
            color={newEvent ? "-" : "-"}
            onClick={() => {
              if (newEvent) {
                getEvents();
                setName("");
                setUrl("https://");
                setMessage("");
                setImportant(false);
                setNewEvent(false);
                setEventSelected(false)
              }
              setNewEvent(!newEvent)
            }}
          />
        </div>
        {newEvent &&
          <div className={styles.newObject}>
            <div className={styles.twoFields}>
              <Input title="Nombre" value={name} onChange={setName} />
              <Input title="Url" value={url} onChange={setUrl} />
            </div>
            <div className={styles.twoFields}>
              <Input title="Mensaje" value={message} onChange={setMessage} />
              <input type="checkbox" onChange={() => setImportant(!important)}/>
            </div>
            {eventSelected ?
              <Button title={"Guardar Cambios"} color="green" onClick={handleUpdate} />
              :
              <Button title="Crear" color="green" onClick={handleCreate} />
            }
          </div>
        }
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Evento</th>
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

export default Events;
