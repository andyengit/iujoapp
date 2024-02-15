import CreatePostContainer from "../../CreatePostContainer";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link"

const ShowComponent = ({ data, typePopUp, getPosts, handleEdit }) => {

  if (typePopUp === "EDIT") {
    return <CreatePostContainer mode="EDIT" data={data} getPosts={getPosts} closePopUp={handleEdit} />
  }
  if (typePopUp === "DELETE") {
    return <h2>Desea borrar este post?</h2>
  }
}


const ShowOptions = ({ styles, dataUser, data, handleEdit, deletePostButton }) => {
  if (!dataUser || (dataUser.id !== data.autor.id && !dataUser.group.isAdmin)) {
    return true;
  }
  return (
    <div className={styles.options}>
      <FiEdit className={styles.edit} onClick={handleEdit} />
      <AiFillDelete className={styles.delete} onClick={deletePostButton} />
    </div>)
}

const ShowAutor = ({ autor, updatedAt, Service, styles }) => {
  return (
    <div className={styles.autorData}>
      <Link href={!Service ? `/u/${autor.username}` : `/s/${Service.path}`}>
        <a>{!Service ? autor.name : Service.name}</a>
      </Link>
      <span></span>
      <span className={styles.date}>{updatedAt.slice(8,10)} / {updatedAt.slice(5,7)} / {updatedAt.slice(0,4)}{Service && " - " + autor.name}</span>
    </div>
  )
}

const FormatContent = ({ content }) => {
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


export { ShowComponent, ShowAutor, FormatContent, ShowOptions, verifyText }
