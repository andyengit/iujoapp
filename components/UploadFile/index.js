import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import axios from "axios";
import useNotification from "../../hooks/useNotification";
import styles from "./UploadFile.module.css";

const UploadFile = ({ setFile, name, filename }) => {

  const [status, setStatus] = useState(false);
  const { token } = useAuth();
  const { setNotification } = useNotification()

  const handleFile = ({ target }) => {
    handleUpload(target.files[0])
  }

  const config = {
    headers: {
      Authorization: `Bareer ${token}`,
      'content-type': 'multipart/form-data'
    },
    onUploadProgress: (event) => {
      let progress = Math.round((event.loaded * 100) / event.total)
      console.log(`Current progress:`, progress);
    },
  };

  const handleUpload = (file) => {
    const form = new FormData();
    const query = filename ? `?filename=${filename}` : ''
    form.append("file", file);
    axios.post(`/api/files/${query}`, form, config)
      .then(({ data }) => {
        setFile && setFile(data.filename)
        setStatus(true)
      })
      .catch(err => {
        setStatus(false)
        setNotification(err.response.data.message || error.reponse.data, "ERROR")
      })
  }

  return <div className={styles.input}>
    <label>{name || ''}</label>
    <div className={styles.inputs}>
      <div className={status ? styles.status + ' ' + styles.sucess : styles.status}></div>
      <input type="file" onChange={handleFile} />
    </div>
  </div>

}

export default UploadFile
