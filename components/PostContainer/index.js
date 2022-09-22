import TextLoading from "../TextLoading";
import styles from "./PostContainer.module.css";
import Tag from "../../components/Tag";
import PopUp from "../PopUp";
import { useState } from "react";
import {FiEdit} from "react-icons/fi";
import {AiFillDelete} from "react-icons/ai";
import CreatePostContainer from "../CreatePostContainer";

const PostContainer = ({data, getPosts, deletePost}) => {

  const [showPopUp, setShowPopUp] = useState(false);
  const [typePopUp, setTypePopUp] = useState("");
  
  const handleEdit = () => {
    setTypePopUp("EDIT");
    setShowPopUp(!showPopUp);
  }

  const deletePostButton = () => {
    setTypePopUp("DELETE");
    setShowPopUp(!showPopUp);
  }

  const showComponent = (data) => {
    const formatedTags = data.tags.map((tag) => tag.name);
    const newData = {...data, tags: formatedTags }

    if (typePopUp === "EDIT") {
      return <CreatePostContainer mode="EDIT" data={newData} getPosts={getPosts} closePopUp={handleEdit} />
    }
    if (typePopUp === "DELETE") {
      return <h1>Delete</h1>
    }
  }

  const handleDelete = () => {
    deletePost(data.id, () => {
      getPosts();
      deletePostButton();
    },() => {
    })
  }

  if (data && Object.keys(data).length > 0) {
  const { title, autor, content, image, tags , updatedAt } = data;
    return (
      <div className={styles.postContainer}>
        {showPopUp && <PopUp 
          children={() => showComponent(data)} 
          type={typePopUp === "EDIT" ? "" : "SELECTION"} 
          callback={typePopUp === "DELETE" ? handleDelete : () => true} 
          closePopUp={handleEdit}/>}
                <div className={styles.about}>
                  <div className={styles.autorImage}></div>
                  <div className={styles.autorData}>
                    <span>{autor.name}</span>
                    <span className={styles.date}>{updatedAt.slice(0,10)}</span>
                  </div>
            <div className={styles.options}>
              <FiEdit className={styles.edit} onClick={handleEdit}/>
              <AiFillDelete className={styles.delete} onClick={deletePostButton}/>
            </div>
                </div>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.content}>{content}</p>
          </div>
          <div className={styles.image}></div>
          <div className={styles.share}>
          <div className={styles.shareButton}>Compartir</div>
          <div className={styles.tags}>
	    {tags && tags.map((tag,index) => <Tag key={index} name={tag.name} />)}
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
