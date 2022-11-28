import fs from 'fs'
import Image from "next/image";
import styles from "./aboutus.module.css"

const AboutUs = (props) => {
  const data = props.data.text
  return <div className={styles.aboutUs}>
    <div className={styles.profile}>
      <Image
        src={"/base/logoplus.png"}
        objectFit="contain"
        height="65.25"
        width={"208,25"}
        alt="Marca Logo"
      />
      <div>
        <h3>{data.name}</h3>
        <p><strong>Correo:</strong> {data.email}</p>
        <p><strong>Dirección:</strong> {data.address}</p>
        <p><strong>Tlf:</strong> {data.phone}</p>
        <p><strong>Faceboook:</strong> <a href={`https://facebook.com/${data.facebook}`}>{data.facebook}</a></p>
        <p><strong>Twitter:</strong> <a href={`https://twitter.com/${data.twitter}`}>{data.twitter}</a></p>
        <p><strong>Instagram:</strong> <a href={`https://instagram.com/${data.instagram}`}>{data.instagram}</a></p>
      </div>

    </div>
    <div>
      <h2>Quienes somos</h2>
      <p>{data.content}</p>
      <h2>Nuestra historia</h2>
      <p>{data.history}</p>

    </div>
  </div>;
}

export default AboutUs

export async function getServerSideProps() {
  let text = "loading..."
  try {
    text = fs.readFileSync('public/base/about.txt', { encoding: 'utf8' })
    text = text.split("\|")
  } catch (e) {
  }
  return {
    props: {
      data: {
        text: {
          name: text[0],
          address: text[1],
          content: text[2],
          history: text[3],
          email: text[4],
          phone: text[5],
          facebook: text[6],
          twitter: text[7],
          instagram: text[8],
        }
      }
    }
  }
}
