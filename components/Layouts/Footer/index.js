import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>Footer</h2>
      <ul>
        <li>
          <Link href="/test">
            <a>Test Page</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/a/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/p">
            <a>Noticias</a>
          </Link>
        </li>
        <li>
          <Link href="/c/Informatica">
            <a>Informatica</a>
          </Link>
        </li>
        <li>
          <Link href="/s/upp">
            <a>UPP</a>
          </Link>
        </li>
        <li>
          <Link href="/u/iujo">
            <a>IUJO USER</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
