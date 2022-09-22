import styles from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {AiOutlineMenu} from "react-icons/ai";
import Slidebar from "../Slidebar";
import {useState} from "react"

const Header = () => {
  const [slidebar, setSlidebar] = useState(false);
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  const handleSlidebar = () => {
    setSlidebar(!slidebar);
  }

  return (
    <header className={styles.header}>
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
	<Link href="/test">
	  <a className={styles.link}>SIGEA</a>
	</Link>
	<Link href="/p">
	  <a className={styles.link}>NOTICIAS</a>
	</Link>
	<Link href="/test">
	  <a className={styles.link}>CONOCENOS</a>
	</Link>
      </div>
      <div className={styles.menu}>
	<AiOutlineMenu color="white" size="2rem" onClick={handleSlidebar} />
      </div>
    </header>
  );
};

export default Header;
