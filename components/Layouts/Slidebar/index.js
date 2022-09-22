import styles from "./Slidebar.module.css";
import {AiOutlineMenu} from "react-icons/ai";


const Slidebar = ({status, handleSlidebar}) => {

  const STATUS = {
    ACTIVE : styles.slidebar + ' ' + styles.active,
    INACTIVE : styles.slidebar
  }

  return (<div className={status ? STATUS.ACTIVE : STATUS.INACTIVE}>
      <div className={styles.menu}>
	<AiOutlineMenu color="white" size="2rem" onClick={handleSlidebar} />
      </div>
      <p>slidebare</p>
    </div>)
}

export default Slidebar;
