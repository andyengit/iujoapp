import { useState } from "react";
import Button from "../../components/Button";
import CheckButton from "../../components/CheckButton";
import Input from "../../components/Input";
import PostContainer from "../../components/PostContainer";
import UploadFile from "../../components/UploadFile";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";

const Test = () => {
  const [check, setCheck] = useState(false);
  const auth = useAuth();
  const { status, setNotification } = useNotification();

  return (
    <div>
      <UploadFile name='Label'/>
      <CheckButton state={check} setState={setCheck} />
      <Button title="TEST" onClick={() => setNotification("t am muasdaso asdkljaskld askdjalsd asdasjdklasjdlsa")} />
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
