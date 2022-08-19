import Content from "./Content";
import Top from "./Top";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.dataHero}>
        <Top />
        <Content />
      </div>
    </section>
  );
};

export default Hero;
