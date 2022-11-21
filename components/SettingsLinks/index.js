import styles from "./SettingsLinks.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import getSettingsUrl from "./utils/getSettingsUrl";
import useAuth from "../../hooks/useAuth";

const SettingsLinks = () => {
  const { pathname } = useRouter();
  const { dataUser } = useAuth();
  const selected = styles.option + " " + styles.selected;

  if (!dataUser) {
    return
  }

  const optionRender = ({ path, name, id }) => {
    return (
      <Link href={pathname !== path ? path : "/a/settings"} key={id}>
        <a className={pathname === path ? selected : styles.option}>{name}</a>
      </Link>
    );
  };

  if (dataUser.group.isAdmin) {
    return <div className={styles.box}>{getSettingsUrl.map(optionRender)}</div>;
  }
  return <div className={styles.box}>{getSettingsUrl.filter(el => !el.admin).map(optionRender)}</div>;
};

export default SettingsLinks;
