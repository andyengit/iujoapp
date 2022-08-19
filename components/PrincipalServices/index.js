import Link from "next/link";
import styles from "./PrincipalServices.module.css";

const services = [
  { name: "UPP", path: "/s/upp" },
  { name: "UPP", path: "/s/upp" },
  { name: "UPP", path: "/s/upp" },
  { name: "UPP", path: "/s/upp" },
  { name: "UPP", path: "/s/upp" },
];

const PrincipalServices = () => {
  return (
    <div className={styles.content}>
      <div className={styles.goBack}></div>
      <div className={styles.servicesList}>
        {services.map((el, index) => (
          <Link key={index} href={el.path}>
            <a className={styles.service}>{el.name}</a>
          </Link>
        ))}
      </div>
      <div className={styles.goNext}></div>
    </div>
  );
};

export default PrincipalServices;
