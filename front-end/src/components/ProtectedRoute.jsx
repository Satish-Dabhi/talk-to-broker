import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { POST_API, VERIFY_TOKEN_END_POINT } from '../redux/services/api';
import { getLocalStorageObject } from '../services/utils';

const ProtectedRoute = () => {
  const userToken = getLocalStorageObject('user_token');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function validToken() {
      const resp = await POST_API(VERIFY_TOKEN_END_POINT, { token: userToken });
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
