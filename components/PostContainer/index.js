import TextLoading from "../TextLoading";
import styles from "./PostContainer.module.css";
import Tag from "../../components/Tag";

const PostContainer = (data) => {
  const { title, autor, content, image, updatedAt } = data;
  if (Object.keys(data).length > 0) {
    return (
      <div className={styles.postContainer}>
        <div className={styles.about}>
          <div className={styles.autorImage}></div>
          <div className={styles.autorData}>
            <span>{autor}</span>
            <span>{updatedAt}</span>
          </div>
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.image}></div>
        <div className={styles.share}>
          <div>Compartir</div>
          <div className={styles.tags}>
            <Tag name="Tag" />
            <Tag name="Tag" />
          </div>
        </div>
      </div>
    );
  } else {
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
        <div className={styles.image}>
          <TextLoading />
        </div>
        <div className={styles.share}>
          <p>Compartir</p>
          <div className={styles.tags}>
            <Tag />
          </div>
        </div>
      </div>
    );
  }
};

export default PostContainer;
