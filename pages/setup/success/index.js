import {sync} from "../../../services/database/relations";

const Success = () => {
  return (
    <div>
      <h1>Success</h1>
      <p>You have successfully setup your account.</p>
    </div>
  );
};

export default Success;

export async function getServerSideProps(context) {
  sync();
  return {
    props: {
      data: true,
    },
  };
}
