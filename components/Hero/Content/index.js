import styles from "./Content.module.css";
import Image from "next/image";
import Link from "next/link";

const Content = ({text}) => {
  return (
    <div className={styles.content}>
      <section className={styles.info}>
        <div className={styles.image}>
          <Image
            src={"/base/principal.png"}
            priority
            height={512}
            width={512}
            objectFit="content"
            alt="Foto del mensaje"
          />
        </div>
        <div className={styles.about}>
          <p className={styles.text}>
            {text} 
          </p>
          <Link href="/aboutus">
            <a>Conocer mas...</a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Content;
