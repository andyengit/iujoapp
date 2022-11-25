import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import TextLoading from "../../../../components/TextLoading";
import useNotification from "../../../../hooks/useNotification";
import { useRouter } from "next/router";

import Button from "../../../../components/Button";

const Services = () => {

  const router = useRouter();
  const { setNotification } = useNotification();
  const { dataUser } = useAuth();
  const [services, setServices] = useState(false);
  const [users, setUsers] = useState(false);
  const [newService, setNewService] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("")
  const [coordinator, setCoordinator] = useState(1);
  const [inputUser, setInputUser] = useState("");
  let US = []
  if (editMode.UsersServices) {
    US = editMode.UsersServices.filter(el => el.status !== false)
  }

  const getUsersServices = () => {
    axios.get(`/api/us?service=${editMode.id}`)
      .then(({ data }) => {
        setEditMode({
          ...editMode, UsersServices: [
            ...data.rows
          ]
        })
      })
      .catch(({ response }) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }

  const getServices = () => {
    axios.get(`/api/services`)
      .then(({ data }) => {
        setServices(data.rows);
      })
      .catch(({ response }) => {
        if (response) {
          setServices([])
        }
      })
    axios.get(`/api/users`)
      .then(({ data }) => {
        setUsers(data.rows.filter((el) => el.id !== 1 ));
      })
      .catch(({ response }) => {
        setNotification(response.data.message, "ERROR");
      })
  }

  useEffect(() => {
    getServices()
  }, [])

  const handleEdit = (el) => {
    setNewService(true)
    setEditMode(el)
    setName(el.name)
    setCoordinator(el.UsersServices.userId)
    setPhone(el.phone)
    setDescription(el.description)
    setEmail(el.email)
    setPath(el.path)
    setInputUser()
  }

  const handleCreate = () => {
    if (name === "" || phone === "" || coordinator === "" || description == "") {
      setNotification("hay uno o varios campos vacios", "ERROR")
      return true
    }

    axios
      .post('/api/services/', { name, email, phone, coordinator, description, path })
      .then(({ data }) => {
        getServices();
        setNotification(data.message)
        setName("")
        setPhone("")
        setEmail("")
        setDescription("")
        setCoordinator("1")
        setPath("")
        newService(false)
      })
      .catch(({ response }) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }

  const handleUpdate = () => {
    let data = {}

    if (name !== editMode.name) {
      data = { ...data, name }
    }
    if (path !== editMode.path) {
      data = { ...data, path }
    }
    if (phone !== editMode.phone) {
      data = { ...data, phone }
    }
    if (email !== editMode.email) {
      data = { ...data, email }
    }
    if (description !== editMode.description) {
      data = { ...data, description }
    }
    if (coordinator !== editMode.coordinator) {
      data = { ...data, coordinator }
    }

    axios
      .put(`/api/services/${editMode.id}`, data)
      .then(({ data }) => {
        getServices();
        setNotification(data.message)
        setName("")
        setPhone("")
        setEmail("")
        setDescription("")
        setCoordinator("1")
        setPath("")
        newService(false)
      })
      .catch(({ response }) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }

  const deleteService = (el) => {
    axios.delete(`/api/services/${el.id}`)
      .then(() => {
        getServices()
        setNotification("Servicio eliminado correctamente")
      })
      .catch((error) => {
        setNotification(error.response.data.response, "ERROR")
      })
  }

  const putCoordinator = (el) => {
    axios.put(`/api/us?id=${el.id}`, { isCoordinator: !el.isCoordinator })
      .then(({ data }) => {
        getServices()
        setNotification(data.message)
        getUsersServices()
      })
      .catch(({ response }) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }

  const addUserService = () => {
    axios.post(`/api/us/`, { userId: inputUser, serviceId: editMode.id })
      .then(({ data }) => {
        getServices()
        setNotification(data.message)
        getUsersServices()
      })
      .catch(({ response }) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }

  const deleteUserService = (el) => {
    axios.delete(`/api/us?service=${el.id}`)
      .then(({ data }) => {
        getServices()
        setNotification(data.message)
        getUsersServices()
      })
      .catch(({ response }) => {
        if (response && response.data) {
          setNotification(response.data.message, "ERROR")
        }
      })
  }

  if (!dataUser) {
    return true
  }

  const ShowList = () => {

    if (!services) {
      return <tr>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
        <td><TextLoading /></td>
      </tr>
    }


    return services.map((el, index) => <tr key={index}>
      <td>{el.name}</td>
      <td>{el.UsersServices[0].services.name}</td>
      <td>/c/{el.path.toLowerCase()}</td>
      <td>
        <Button title="VER" onClick={() => router.push(`/s/${el.path}`)} />
        <Button title="EDITAR" color="orange" onClick={() => handleEdit(el)} />
        <Button title="ELIMINAR" color="red" onClick={() => deleteService(el)} />
      </td>
    </tr>
    )
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>Servicios</h3>
          <Button
            title={newService ? "-" : "+"}
            color={newService ? "-" : "-"}
            onClick={() => {
              if (editMode) {
                setEditMode(false)
                setName("")
                setPhone("")
                setEmail("")
                setDescription("")
                setPath("")
                setCoordinator("1")
              }
              setNewService(!newService)
            }}
          />
        </div>
        {newService &&
          <div className={styles.newObject}>
            <div className={styles.twoFields}>
              <Input
                title="Nombre"
                value={name}
                onChange={setName} />
              <Input
                title="Telefono"
                value={phone}
                type="number"
                onChange={setPhone} />
            </div>
            <div className={styles.twoFields}>
              <Input
                title="Correo"
                value={email}
                onChange={setEmail} />
              <Input
                title="Coordinator"
                value={coordinator}
                disabled={editMode && true}
                onChange={setCoordinator} type="selection" valueMap={users} />
            </div>
            <textarea
              placeholder="Descripcion"
              onChange={({ target }) => setDescription(target.value)}
              value={description} />
            <div className={styles.twoFields}>
              <Input
                title="Path"
                only="letter"
                value={path}
                onChange={setPath} />
            </div>
            {editMode ?
              <>
                <Button title="Actualizar" color="green" onClick={handleUpdate} />
                <div className={styles.twoFields}>
                  <Input title="Usuario" value={inputUser} onChange={setInputUser} type="selection" valueMap={users.filter((el) => {
                    let value = editMode.UsersServices.filter(eledit => el.id === eledit.userId && eledit.status !== false)
                    if (value.length === 0) {
                      return true
                    }
                    return false
                  })} />
                  <Button title="Añadir" onClick={addUserService} />
                </div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Coordinador</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editMode && US.length > 0 && US.map((el, index) => <tr key={index}>
                      <td>{el.services.name}</td>
                      <td><input type="checkbox" defaultChecked={el.isCoordinator} onClick={() => putCoordinator(el)} /></td>
                      <td><Button title="x" color="red" onClick={() => deleteUserService(el)} /></td>
                    </tr>)}

                  </tbody>
                </table>
              </>
              :
              <Button title="Crear" color="green" onClick={handleCreate} />
            }
          </div>
        }
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>COORDINADOR</th>
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

export default Services;
