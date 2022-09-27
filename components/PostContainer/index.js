import styles from "./PostContainer.module.css";
import Tag from "../../components/Tag";
import PopUp from "../PopUp";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Image from 'next/image'
import TemplateClear from "./utils/TemplateClear";
import { ShowComponent, formatContent, verifyText, ShowAutor, ShowOptions } from "./utils/ShowComponents";


const PostContainer = ({ data, getPosts, deletePost, modeParam }) => {

  const [showPopUp, setShowPopUp] = useState(false);
  const [typePopUp, setTypePopUp] = useState("");
  const { dataUser } = useAuth();
  const [showMore, setShowMore] = useState("0");
  const [mode, setMode] = useState(modeParam || false)
  const router = useRouter();

  useEffect(() => {
    if (data) {
      if (verifyText(data)) setShowMore("1");
    }
  }, [data])

  if (!data) return <TemplateClear styles={styles} />

  const handleEdit = () => {
    setTypePopUp("EDIT");
    setShowPopUp(!showPopUp);
  }

  const deletePostButton = () => {
    setTypePopUp("DELETE");
    setShowPopUp(!showPopUp);
  }


  const handleDelete = () => {
    deletePost(data.id, () => {
      getPosts();
      deletePostButton();
    }, () => {
    })
  }

  const handleShowMore = () => {
    if (!data) return true
    if (mode) {
      router.push(`/p/${data.id}`);
      return true;
    }
    setShowMore("2");
  }

  const { title, autor, content, image, tags, updatedAt, Service } = data;
  return (
    <div className={styles.postContainer}>
      {showPopUp && <PopUp
        children={() =>
          <ShowComponent
            data={data}
            typePopUp={typePopUp}
            getPosts={getPosts}
            handleEdit={handleEdit}
          />}
        type={typePopUp === "EDIT" ? "" : "SELECTION"}
        callback={typePopUp === "DELETE" ? handleDelete : () => true}
        closePopUp={handleEdit} />}
      <div className={styles.about}>
        <div className={styles.autorImage}></div>
        <ShowAutor
          autor={autor}
          updatedAt={updatedAt}
          Service={Service}
          styles={styles} />
        <ShowOptions
          styles={styles}
          data={data}
          dataUser={dataUser}
          handleEdit={handleEdit}
          deletePostButton={deletePostButton} />
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={
          showMore !== "2" ? styles.content : styles.content + " " + styles.expand}>
          {content && formatContent(content)}
          {showMore === "1" && (
            <div className={styles.shadow}>
              <p className={styles.showMore} onClick={handleShowMore}>Ver mas</p>
            </div>
          )}
        </div>
      </div>
      {image && (
        <div className={styles.image}>
          <Image src={image} layout="fill" objectFit="cover" priority alt='seo' />
        </div>
      )}
      <div className={styles.share}>
        <div className={styles.shareButton}>Compartir</div>
        <div className={styles.tags}>
          {tags && tags.map((tag, index) => <Tag key={index} name={tag.name} />)}
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
