import CreatePostContainer from "../../CreatePostContainer";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const ShowComponent = ({ data, typePopUp, getPosts, handleEdit }) => {
  const formatedTags = data.tags.map((tag) => tag.name);
  const newData = { ...data, tags: formatedTags }

  if (typePopUp === "EDIT") {
    return <CreatePostContainer mode="EDIT" data={newData} getPosts={getPosts} closePopUp={handleEdit} />
  }
  if (typePopUp === "DELETE") {
    return <h2>Desea borrar este post?</h2>
  }
}

const ShowOptions = ({ styles, dataUser, data, handleEdit, deletePostButton }) => {
  if (dataUser && dataUser.id === data.autor.id) {
    return (
      <div className={styles.options}>
        <FiEdit className={styles.edit} onClick={handleEdit} />
        <AiFillDelete className={styles.delete} onClick={deletePostButton} />
      </div>)
  }
  return true;
}

const ShowAutor = ({ autor, updatedAt, Service, styles }) => {
  return (
    <div className={styles.autorData}>
      <span>{!Service ? autor.name : Service.name}</span>
      <span className={styles.date}>{updatedAt.slice(0, 10)}{Service && " - " + autor.name}</span>
    </div>
  )
}

const formatContent = (content) => {
  return content.split("\n").map((el, key) => <p key={key}>{el}</p>)
}

const verifyText = (data) => {
  let countCharacters = data.content.length;
  const countLines = data.content.split('\n');
  let maxCountLines = countLines.length;
  let maxCharacters = 330;

  if (countLines.length < 3) {
    maxCountLines = 3
  }

  let maxLine = false;
  for (let x = 0; x < maxCountLines; x++) {
    if (x.length > maxCharacters) {
      maxLine = true;
    } else {
      maxCharacters -= 50;
    }
  }

  if (countCharacters > 330 || countLines.length >= 3 || maxLine) {
    return true;
  }
  return false;
}


export { ShowComponent, ShowAutor, formatContent, ShowOptions, verifyText }
