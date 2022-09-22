import Layouts from "../components/Layouts";
import AuthProvider from "../context/AuthProvider";
import "../styles/globals.css";

function  MyApp({ Component, pageProps}) {
  return (
    <AuthProvider>
      <Layouts>
         <Component {...pageProps} />
      </Layouts>
    </AuthProvider>
  );
}

export default MyApp;
