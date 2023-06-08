import React from 'react';
import VerticalTabs from '../components/dashboard/VerticalTabs';
import { useSelector } from 'react-redux';
import { getLocalStorageObject } from '../services/utils';
import { LOCAL_OBJECT_SECRET_KEY } from '../services/utils/constant';
import CryptoJS from 'crypto-js';

function UserProfile() {
  const user = getLocalStorageObject('user');
  const userData = user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  console.log('u.......', JSON.parse(userData));

  return <VerticalTabs />;
}

export default UserProfile;
