import { useState } from "react";
import Button from "../../components/Button";
import CheckButton from "../../components/CheckButton";
import Input from "../../components/Input";
import PostContainer from "../../components/PostContainer";
import useAuth from "../../hooks/useAuth";

const Test = () => {
  const [check, setCheck] = useState(false);
  const auth = useAuth();
  
  return (
    <div>
      <CheckButton state={check} setState={setCheck} />
      <Input title="Hola maricasssssss" />
      <Button onClick={auth.test} />
      <PostContainer />
    </div>
  );
};

export default Test;

export async function getServerSideProps() {
  return {
    props: {
      data: {},
    },
  };
}
