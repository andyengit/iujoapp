import { sync } from "../../../services/database/relations";

const Success = ({ data }) => {
  return (
    <div>
      <h1>Success</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default Success;

export async function getServerSideProps(context) {
  const response = await sync();
  return {
    props: {
      data: response,
    },
  };
}
