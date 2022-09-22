import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LogOut = () => {
  const {logOut} = useAuth();
  
  useEffect(() => {
    logOut();
  }, []);

  return (<div>redirecting...</div>)
}

export default LogOut;
