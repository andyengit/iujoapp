import styles from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {AiOutlineMenu} from "react-icons/ai";
import Slidebar from "../Slidebar";
import {useState} from "react"
import useNotification from "../../../hooks/useNotification";
import Notification from "../../Notification";
import SlidebarLinks from "../utils/links";

const Header = () => {
  const [slidebar, setSlidebar] = useState(false);
  const notification = useNotification();
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  const handleSlidebar = () => {
    setSlidebar(!slidebar);
  }

  return (
    <header className={styles.header}>
      {notification && notification.status && (<Notification/>)}
      <Slidebar status={slidebar} handleSlidebar={handleSlidebar}/>
      <div className={styles.principal}>
        <div className={styles.image} onClick={goHome}>
          <Image
            src={"/img/principal.png"}
            objectFit="contain"
            height="65.25"
            width={"208,25"}
            alt="IUJO logo"
          />
        </div>
        {SlidebarLinks.map((link, index) => (
          <Link href={link.path} key={index}>
            <a className={styles.link}>{link.name}</a>
          </Link>))}
            </div>
            <div className={styles.menu}>
        <AiOutlineMenu color="white" size="2rem" onClick={handleSlidebar} />
      </div>
    </header>
  );
};

export default Header;
