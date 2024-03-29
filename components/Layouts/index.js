import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";

const Layouts = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CMS System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Pagina educacional de Iujo" />
        <link rel="icon" href="/base/favicon.ico" />
      </Head>
      {router.asPath === "/" || router.asPath === '/setup' || <Header />}
      <main className="main">{children}</main>
      {router.asPath === '/setup' || <Footer />}
    </>
  );
};

export default Layouts;
