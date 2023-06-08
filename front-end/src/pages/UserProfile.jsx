import React, { useEffect, useState } from 'react';
import VerticalTabs from '../components/dashboard/VerticalTabs';
import { getLocalStorageObject } from '../services/utils';
import { LOCAL_OBJECT_SECRET_KEY } from '../services/utils/constant';
import CryptoJS from 'crypto-js';

function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = getLocalStorageObject('token');
    const loggedInUser = user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    user && setUserData(JSON.parse(loggedInUser));
  }, []);

  return <VerticalTabs userData={userData?.user} />;
}

export default UserProfile;
