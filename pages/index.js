import Hero from "../components/Hero";
import PrincipalPost from "../components/PrincipalPost";
import PrincipalCareer from "../components/PrincipalCareer";
import PrincipalServices from "../components/PrincipalServices";
import fs from 'fs'

export default function Home({ data }) {
  return (
    <>
      <Hero text={data.text}/>
      <PrincipalPost />
      <PrincipalCareer />
      <PrincipalServices />
    </>
  );
}

export async function getServerSideProps() {
  let text = "loading..."
  try {
    text = fs.readFileSync('public/base/text.txt', { encoding: 'utf8' })
  } catch (e) {
  }
  return {
    props: {
      data: {
        text: text
      }
    }
  }
}
