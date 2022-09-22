import styles from "./CreatePostContainer.module.css";
import styleLoading from "../TextLoading/TextLoading.module.css";
import Button from "../Button";
import usePosts from "../../hooks/usePosts";
import { useState } from "react";
import {FaUserCog} from 'react-icons/fa';
import {FiImage} from 'react-icons/fi';

const CreatePostContainer = ({getPosts, mode = "CREATE" , data, closePopUp}) => { 
  const MODE = {
    CREATE: "CREATE",
    EDIT: "EDIT"
  }

  const STATUS = {
    OK : "",
    WAITING: styles.waiting,
    BLOCKED: "BLOCKED"
  }

  const [title, setTitle] = useState(data ? data.title : "");
  const [content, setContent] = useState(data ? data.content : "");
  const [stateButton, setStateButton] = useState(false);
  const [status, setStatus] = useState(STATUS.OK);
  const [tags, setTags] = useState(data ? data.tags : []);
  const [tag, setTag] = useState("");
  
  if (title.length > 0 && content.length > 0) {
    if (stateButton === false) setStateButton(true);
  } else {
    if (stateButton === true) setStateButton(false);
  }

  const { createPost, updatePost } = usePosts();

  const handleAddTag = () => {
    if (tag.length < 3) return true;
    
    const newTag = tag.trim().replace(/ /g, "-");
    
    if (newTag.length > 15) return true;
    if (tags.includes(newTag)) return true;

    if (newTag.length > 0){
      setTags([...tags, newTag]);
      setTag("");
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  }

  const handleUpdate = async () => {
    updatePost(data.id, {title, content}, () => {
      setStatus(STATUS.OK);
      setTitle("");
      setContent("");
      setTags([]);
      closePopUp();
      getPosts();
    }, () => {
      setStatus(STATUS.OK);
    });
  }

  const handlePost = () => {
    setStatus(STATUS.WAITING)
    createPost({title, content, tags, userId: 1}, () => {
      setStatus(STATUS.OK);
      setTitle("");
      setContent("");
      setTags([]);
      getPosts();
    }, () => {
      setStatus(STATUS.OK);
    })
  }

  return (
    <div className={styles.container}>
      {status !== STATUS.OK && <div className={styles.status + ' ' + status + ' ' + styleLoading.animation}></div>}
      <input
        className={styles.title}
        placeholder="Titulo de la publicacion..."
	onChange={(e) => setTitle(e.target.value)}
	value={title}
      />
      <textarea
        className={styles.content}
        placeholder="Contenido de la publicacion..."
	onChange={(e) => setContent(e.target.value)}
	value={content}
      />
      <div className={styles.moreInfo}>
	{tags && (<div className={styles.showTags}>
	  {tags.map((tag, index) => (
	  <div key={index} className={styles.tagElement}>
	    <p>{tag}</p>
	    <button 
	      className={styles.remove} 
	      onClick={() => handleRemoveTag(tag)}>x</button>
	  </div>))}
	</div>)}

	{mode === MODE.CREATE && 
	(<div className={styles.service}>
	  <p>Publicar como:</p>
	  <div className={styles.select}>
	    <p>ignaciodeloyola</p>
	    <FaUserCog />
	  </div>
	</div>)
	}
      </div>
      <div className={styles.options}>
        <div className={styles.adds}>
          <div className={styles.uploadImage}>
	    <FiImage size="2rem" className={styles.image}/>
            <input type="file" className={styles.hidden} />
          </div>
          <div>
	    <div className={styles.tags}>
	      <input 
		placeholder="Etiquetas" 
		onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
		onChange={({target}) => setTag(target.value)}
		value={tag}
	      />
	      <button 
		className={styles.add} 
		onClick={handleAddTag}>+</button>
	    </div>
	  </div>
        </div>
        <Button title="Publicar" onClick={mode === "CREATE" ? handlePost : handleUpdate} state={stateButton}/>
      </div>
    </div>
  );
};

export default CreatePostContainer;
