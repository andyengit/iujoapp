import styles from "./PostContainer.module.css";
import Tag from "../../components/Tag";
import PopUp from "../PopUp";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Image from 'next/image'
import TemplateClear from "./utils/TemplateClear";
import { ShowComponent, FormatContent, verifyText, ShowAutor, ShowOptions } from "./utils/ShowComponents";
import { MdZoomOutMap } from "react-icons/md"


const PostContainer = ({ data, getPosts, deletePost, modeParam }) => {



  const [showPopUp, setShowPopUp] = useState(false);
  const [typePopUp, setTypePopUp] = useState("");
  const { dataUser } = useAuth();
  const [showMore, setShowMore] = useState("0");
  const [mode, setMode] = useState(modeParam || false)
  const [image, setImage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!!data && verifyText(data)) {
      setShowMore("1");
    }
  }, [data])

  if (!data) return <TemplateClear styles={styles} />

  const { title, autor, content, images, tags, updatedAt, Service } = data;

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

  const handleImage = ({ image = false }) => {
    setImage(image)
  }

  const ShowImageSelected = () => {
    if (!image) {
      return
    }
    return <div className={styles.popImage}>
      <span onClick={handleImage} className={styles.closePopImage}>Cerrar</span>
      <div className={styles.imagePop}>
        <Image src={image} layout="fill" objectFit="contain" alt={`${title} ${content}`}/>
      </div>
    </div>
  }

  const handleShowMore = () => {
    if (mode) {
      router.push(`/p/${data.id}`);
      return true;
    }
    setShowMore("2");
  }


  const ShowPopUpComponent = () => {
    if (showPopUp) {
      return (<PopUp
        type={typePopUp === "EDIT" ? "" : "SELECTION"}
        callback={typePopUp === "DELETE" ? handleDelete : () => true}
        closePopUp={handleEdit}>
        <ShowComponent
          data={data}
          typePopUp={typePopUp}
          getPosts={getPosts}
          handleEdit={handleEdit}
        />
      </PopUp>)
    }
  }

  const ShowImage = () => {
    if (images && images.length > 0)
      return (
        <div className={styles.imageContainer}>
          <div className={styles.showMax} onClick={() => handleImage({ image: images[0].path })}>
            <MdZoomOutMap size={"2rem"} />
            <span>Aumentar</span>
          </div>
          <div className={styles.image}>
            <Image src={images[0].path} layout="fill" objectFit="cover" priority alt={`${title} ${content}`} />
          </div>
        </div>
      )
  }

  const ShowTags = () => {
    if (tags) {
      return tags.map((tag, index) => <Tag key={index} name={tag.name} />)
    }
  }

  return (
    <div className={styles.postContainer}>
      <ShowImageSelected />
      <ShowPopUpComponent />
      <div className={styles.top}>
        <div className={styles.about}>
          {autor.image ? <div className={styles.autorImage}>
            <Image src={autor.image} layout="fill" objectFit="cover" priority alt={autor.name} />
          </div> :
            <div className={styles.autorNoImage}>
              a
            </div>
          }
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
            <FormatContent content={content} />
            {showMore === "1" && (
              <div className={styles.shadow}>
                <p className={styles.showMore} onClick={handleShowMore}>Ver mas</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ShowImage />
      <div className={styles.share}>
        <div className={styles.shareButton}>Compartir</div>
        <div className={styles.tags}>
          <ShowTags />
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
