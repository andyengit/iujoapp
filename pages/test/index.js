const Test = () => {
  return <h1>Hello</h1>;
};

export default Test;

export async function getServerSideProps() {
  return {
    props: {
      data: {},
    },
  };
}
