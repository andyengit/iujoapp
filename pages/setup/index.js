import { useRouter } from "next/router";
import { useState } from "react";

const Setup = ({ data }) => {
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleLogin = () => {
    if (data.SYSTEM_KEY === password) {
      router.push("/setup/success");
    }
  };

  return (
    <>
      <h1>Setup</h1>
      <input
        onChange={({ target }) => setPassword(target.value)}
        type="password"
        placeholder="LLAVE DE PRODUCTO"
      />
      <button onClick={handleLogin}>REINICIAR</button>
    </>
  );
};

export default Setup;

export async function getServerSideProps() {
  require("dotenv").config();
  const SYSTEM_KEY = process.env.SYSTEM_KEY;
  return {
    props: {
      data: { SYSTEM_KEY: SYSTEM_KEY },
    },
  };
}
