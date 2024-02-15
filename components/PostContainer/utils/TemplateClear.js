import TextLoading from "../../TextLoading";
import Tag from "../../Tag";

const TemplateClear = ({styles}) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.about}>
        <div className={styles.autorImage}></div>
        <div className={styles.autorData}>
          <TextLoading />
        </div>
      </div>
      <div className={styles.content}>
        <TextLoading />
      </div>
      <div className={styles.share}>
        <p>Compartir</p>
        <div className={styles.tags}>
          <Tag />
        </div>
      </div>
    </div>)
}

export default TemplateClear;

