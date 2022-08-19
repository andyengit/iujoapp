import Hero from "../components/Hero";
import PrincipalPost from "../components/PrincipalPost";
import PrincipalCareer from "../components/PrincipalCareer";
import PrincipalServices from "../components/PrincipalServices";

export default function Home() {
  return (
    <>
      <Hero />
      <PrincipalPost />
      <PrincipalCareer />
      <PrincipalServices />
    </>
  );
}
