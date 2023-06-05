import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { POST_API, VERIFY_TOKEN_END_POINT } from '../redux/services/api';
import { getLocalStorageObject } from '../services/utils';

const ProtectedRoute = () => {
  const userToken = getLocalStorageObject('user_token');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    async function validToken() {
      const resp = await POST_API(VERIFY_TOKEN_END_POINT, { token: userToken });
      if (resp?.valid) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    }
    userToken && validToken();
  }, []);

  if (userLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/userAuth" />;
  }
};

export default ProtectedRoute;
