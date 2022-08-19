import { useState } from "react";
import Button from "../../components/Button";
import CheckButton from "../../components/CheckButton";
import Input from "../../components/Input";
import PostContainer from "../../components/PostContainer";

const Test = () => {
  const [check, setCheck] = useState(false);

  return (
    <div>
      <Button color="orange" title={"Name"} />
      <CheckButton state={check} setState={setCheck} />
      <Input title="Hola marica" />
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
