import Image from "next/image";
import Link from "next/link";
import styles from "./Top.module.css";

const Top = () => {

  return (
    <div className={styles.headerHero}>
      <div className={styles.image}>
        <Image
          src={"/base/logo.png"}
          objectFit="contain"
          height="65.25"
          priority
          width={"208,25"}
          alt="logo"
        />
      </div>
      <Link href="/p">
        <a className={styles.link}>NOTICIAS</a>
      </Link>
      <Link href="/aboutus">
        <a className={styles.link}>CONOCENOS</a>
      </Link>
    </div>
  );
};

export default Top;
