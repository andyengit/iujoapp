import {useState, useEffect ,createContext} from 'react';

export const notificationContext = createContext() 

export const notificationProvider = ({children}) => {

  const [status, setStatus] = useState(false);
  const [type, setType] = useState("MESSAGE")
  const [message, setMessage] = useState("");

  const setNotification = (messageProp = "u", typeProp = "MESSAGE") => {
    setType(typeProp);
    setMessage(messageProp);
    setStatus(true);
  }

  useEffect(() => {
    if(status){
      setTimeout(() => {
        setType("MESSAGE");
        setMessage("");
        setStatus(false);
      }, 6000);
    }
  }, [status])

  const contextValue = {
    status,
    setNotification,
    message,
    type,
    setStatus
  }

  return (<notificationContext.Provider value={contextValue}>
    {children}
  </notificationContext.Provider>)
}

export default notificationProvider;
