import styles from "./PrincipalCareer.module.css";
import Link from "next/link";

const career = [
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
  { name: "Informatica", path: "/c/Informatica" },
];

const PrincipalCareer = () => {
  return (
    <div className={styles.content}>
      <div className={styles.careerList}>
        {career.map((el, index) => (
          <Link href={el.path} key={index}>
            <a className={styles.career}>{el.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PrincipalCareer;
