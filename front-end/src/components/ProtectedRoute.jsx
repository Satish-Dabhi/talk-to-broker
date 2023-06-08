import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { POST_API, VERIFY_TOKEN_END_POINT } from '../redux/services/api';
import { getLocalStorageObject } from '../services/utils';
import CryptoJS from 'crypto-js';
import { LOCAL_OBJECT_SECRET_KEY } from '../services/utils/constant';

const ProtectedRoute = () => {
  const token = getLocalStorageObject('token');
  const decryptedToken = token && CryptoJS.AES.decrypt(token, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const userToken = JSON.parse(decryptedToken);

  useEffect(() => {
    async function validToken() {
      console.log("userToken", userToken);
      const resp = await POST_API(VERIFY_TOKEN_END_POINT, { token: userToken?.token });
      if (resp?.valid) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
      setLoading(false); // Set loading to false after useEffect completes
    }

    if (userToken) {
      validToken();
    } else {
      setLoading(false); // Set loading to false after useEffect completes
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userLoggedIn ? <Outlet /> : <Navigate to="/userAuth" />;
};

export default ProtectedRoute;
