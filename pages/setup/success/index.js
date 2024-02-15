import { sync } from "../../../services/database/relations";
import { verifyToken } from "../../../utils/handleToken";

const Success = ({ data }) => {
  return (
    <div>
      <h1>Success</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default Success;

export async function getServerSideProps({ query }) {
  if (query && query.token !== undefined) {
    let verify = await verifyToken(query.token)
    if (verify) {
      let response = await sync(verify.user)
      return {
        props: {
          data: response,
        },
      };
    }
  }
  return {
    redirect: {
      destination: '/setup',
      permanent: false,
    },
  }
}
