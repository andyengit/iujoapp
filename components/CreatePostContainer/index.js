import styles from "./CreatePostContainer.module.css";
import Button from "../Button";

const CreatePostContainer = () => {
  return (
    <div className={styles.container}>
      <input
        className={styles.title}
        placeholder="Titulo de la publicacion..."
      />
      <textarea
        className={styles.content}
        placeholder="Contenido de la publicacion..."
      />
      <div className={styles.options}>
        <div className={styles.adds}>
          <div className={styles.uploadImage}>
            <div className={styles.image}></div>
            <input type="file" className={styles.hidden} />
          </div>
          <div>
            <input className={styles.tags} placeholder="Etiquetas" />
          </div>
        </div>
        <Button title="Publicar" />
      </div>
    </div>
  );
};

export default CreatePostContainer;
