import styles from "./Notification.module.css"
import useNotification from "../../hooks/useNotification";

const Notification = () => {

  const noti = useNotification();
  
  let style = styles.notification;

  if (noti.type === "ERROR"){
    style = styles.notification + ' ' + styles.error
  }


  return (<div className={style}>
    <p>{noti.message}</p>
    <p className={styles.close} onClick={() => {
      noti.setStatus(false);
    }}>Cerrar</p>
    </div>)
}

export default Notification;
