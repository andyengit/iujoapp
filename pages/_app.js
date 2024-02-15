import Layouts from "../components/Layouts";
import AuthProvider from "../context/AuthProvider";
import NotificationProvider from "../context/NotificationProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps}) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Layouts>
           <Component {...pageProps} />
        </Layouts>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default MyApp;
