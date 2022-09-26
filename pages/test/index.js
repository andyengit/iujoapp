import { useState } from "react";
import Button from "../../components/Button";
import CheckButton from "../../components/CheckButton";
import Input from "../../components/Input";
import PostContainer from "../../components/PostContainer";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";

const Test = () => {
  const [check, setCheck] = useState(false);
  const auth = useAuth();
  const {status, setNotification} = useNotification();

  console.log(status)
  
  return (
    <div>
      <CheckButton state={check} setState={setCheck} />
      <Input title="Hola maricasssssss" />
      <Button title="TEST" onClick={() => setNotification("t am muasdaso asdkljaskld askdjalsd asdasjdklasjdlsa")} />
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
