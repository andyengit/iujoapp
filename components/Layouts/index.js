import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";

const Layouts = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Iujo | Barquisimeto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Pagina educacional de Iujo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {router.asPath === "/" || <Header />}
      <main className="main">
        {children}
      </main>
      <Footer/>
    </>);
};

export default Layouts;
