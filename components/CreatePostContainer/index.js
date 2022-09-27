import styles from "./CreatePostContainer.module.css";
import styleLoading from "../TextLoading/TextLoading.module.css";
import { useRouter } from 'next/router'
import Button from "../Button";
import usePosts from "../../hooks/usePosts";
import { useState, useEffect } from "react";
import { FaUserCog } from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { AiOutlineClose} from 'react-icons/ai'; 
import Image from "next/image";

const CreatePostContainer = ({ getPosts, mode = "CREATE", data, closePopUp, service }) => {
  const MODE = {
    CREATE: "CREATE",
    EDIT: "EDIT"
  }

  const STATUS = {
    OK: "",
    WAITING: styles.waiting,
    BLOCKED: "BLOCKED"
  }

  const [title, setTitle] = useState(data ? data.title : "");
  const [content, setContent] = useState(data ? data.content : "");
  const [stateButton, setStateButton] = useState(false);
  const [status, setStatus] = useState(STATUS.OK);
  const [tags, setTags] = useState(data ? data.tags : []);
  const [tag, setTag] = useState("");
  const [serviceId, setServiceId] = useState(service ? service.id : null)
  const [image, setImage] = useState(null);
  const [firstImage, setFirstImage] = useState(data && data.image ? true : false)

  const router = useRouter();
  const auth = useAuth();

  if (title.length > 0 && content.length > 0) {
    if (stateButton === false) setStateButton(true);
  } else {
    if (stateButton === true) setStateButton(false);
  }

  const { createPost, updatePost } = usePosts();

  const handleImage = ({ target }) => {
    setFirstImage(false);
    setImage(target.files[0]);
  }


  const handleAddTag = () => {
    if (tag.length < 3) return true;

    const newTag = tag.trim().replace(/ /g, "-");

    if (newTag.length > 15) return true;
    if (tags.includes(newTag)) return true;

    if (newTag.length > 0) {
      setTags([...tags, newTag]);
      setTag("");
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  }

  const handleUpdate = async () => {
    setStatus(STATUS.WAITING)
    updatePost(data.id, { title, content }, () => {
      setTitle("");
      setContent("");
      setTags([]);
      closePopUp();
      getPosts();
    }, () => { }, () => {
      setStatus(STATUS.OK);
    });
  }

  const handlePost = () => {
    setStatus(STATUS.WAITING)
    createPost({ title, content, image, tags, serviceId }, () => {
      setTitle("");
      setContent("");
      setTags([]);
      getPosts();
    }, () => { }, () => {
      setStatus(STATUS.OK);
    });
  }

  const showService = () => {
    if (mode === MODE.CREATE && router.pathname !== '/a/dashboard') {
      return (
        <div className={styles.service}>
          <p>Publicando como:</p>
          <div className={styles.select}>
            <p>{service && service.name}</p>
          </div>
        </div>)
    }
  }

  return (
    <div className={styles.container}>
      {status !== STATUS.OK && (
        <div className={styles.status + ' ' + status + ' ' + styleLoading.animation}></div>)}
      <input
        className={styles.title}
        placeholder="Titulo de la publicacion..."
        onChange={(e) => setTitle(e.target.value)}
        value={title} />
      <textarea
        className={styles.content}
        placeholder="Contenido de la publicacion..."
        onChange={(e) => setContent(e.target.value)}
        value={content} />
      {image && (
        <div className={styles.previewImage}>
          <AiOutlineClose
            onClick={() => setImage(null)}
            className={styles.closeImage}
            size={"2rem"}
            color={"white"}
          />
          <Image
            src={firstImage ? image : URL.createObjectURL(image)}
            layout="fill"
            objectFit={"cover"}
            alt={"Preview"}
          />
        </div>
      )}
      <div className={styles.moreInfo}>
        {tags && (
          <div className={styles.showTags}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tagElement}>
                <p>{tag}</p>
                <button
                  className={styles.remove}
                  onClick={() => handleRemoveTag(tag)}>x</button>
              </div>))}
          </div>)}
        {showService()}
      </div>
      <div className={styles.options}>
        <div className={styles.adds}>
          <div className={styles.uploadImage}>
            <FiImage size="2rem" className={styles.image} />
            <input type="file" className={styles.hidden} onChange={handleImage} />
          </div>
          <div>
            <div className={styles.tags}>
              <input
                placeholder="Etiquetas"
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                onChange={({ target }) => setTag(target.value)}
                value={tag} />
              <button
                className={styles.add}
                onClick={handleAddTag}>+</button>
            </div>
          </div>
        </div>
        <Button
          title={mode === "CREATE" ? "Publicar" : "Actualizar"}
          onClick={mode === "CREATE" ? handlePost : handleUpdate}
          state={stateButton} />
      </div>
    </div>
  );
};

export default CreatePostContainer;
