import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import checkSignIn from '../components/authentication/checkSignIn';
import useAuthStore from '../store/store';

const PrivateRouters = () => {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSignInStatus = async () => {
      await checkSignIn();
      setLoading(false);
    };

    checkSignInStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouters;
