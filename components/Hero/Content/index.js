import styles from "./Content.module.css";
import Image from "next/image";
import Link from "next/link";

const Content = () => {
  return (
    <div className={styles.content}>
      <section className={styles.info}>
        <div className={styles.image}>
          <Image
            src={"/img/maria.svg"}
            priority
            height={512}
            width={512}
            objectFit="content"
            alt="Jose Maria Velaz"
          />
        </div>
        <div className={styles.about}>
          <p className={styles.text}>
            &quot;Lorem ipsum letir letir saro meri tasmis mdioasdalkasld
            asdklasdkasdkasjdlas asd asdj askdj lkas kasjlkd asldj lasj kajsdkl
            asj dslak laksdj lkaslkd alksjd lkasdj lkasj dlk&quot;
          </p>
          <Link href="/test">
            <a>Conocer mas acerca del IUJO...</a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Content;
