import styles from "./Slidebar.module.css";
import {AiOutlineMenu} from "react-icons/ai";
import SlidebarLinks from "../utils/links";
import Link from "next/link";

const Slidebar = ({status, handleSlidebar}) => {

  const STATUS = {
    ACTIVE : styles.slidebar + ' ' + styles.active,
    INACTIVE : styles.slidebar
  }

  return (<div className={status ? STATUS.ACTIVE : STATUS.INACTIVE}>
      <div className={styles.top}>
        <div className={styles.menu}>
          <AiOutlineMenu color="white" size="2rem" onClick={handleSlidebar} />
          <h3>Menu</h3>
        </div>
        {SlidebarLinks.map((link, index) => (
          <Link href={link.path} key={index}>
            <a className={styles.link}>{link.name}</a>
          </Link>))}
      </div>
      <div className={styles.bottom}>
        <Link href="/a/settings">
          <a>OPCIONES</a>
        </Link>
        <p>© 2021 IUJO. Todos los derechos reservados.</p>
      </div>
    </div>)
}

export default Slidebar;
