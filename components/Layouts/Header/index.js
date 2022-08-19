import styles from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  return (
    <header className={styles.header}>
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
    </header>
  );
};

export default Header;
