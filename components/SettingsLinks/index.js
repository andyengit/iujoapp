import styles from "./SettingsLinks.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import getSettingsUrl from "./utils/getSettingsUrl";

const SettingsLinks = () => {
  const { pathname } = useRouter();
  const selected = styles.option + " " + styles.selected;

  const optionRender = ({ path, name, id }) => {
    return (
      <Link href={pathname !== path ? path : "/a/settings"} key={id}>
        <a className={pathname === path ? selected : styles.option}>{name}</a>
      </Link>
    );
  };

  return <div className={styles.box}>{getSettingsUrl.map(optionRender)}</div>;
};

export default SettingsLinks;
