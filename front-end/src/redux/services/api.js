export const API_HOSTNAME = 'http://localhost:3005';
export const ADD_PROPERTY_END_POINT = '/property';
export const GET_PROPERTIES_END_POINT = '/property';
export const GET_PROPERTIES_BY_TYPE = '/property/${type}';
export const SEND_EMAIL_END_POINT = '/send-email';
export const ADD_USER_END_POINT = '/user';
export const GET_USER_BY_EMAIL_END_POINT = '/user/${email}';
export const UPDATE_USER_BY_EMAIL_END_POINT = '/user/updateUser';
export const VERIFY_VERIFICATION_CODE_END_POINT = '/user/verifyOtp';



export const POST_API = async (api, data) => {
  const newApi = API_HOSTNAME + api;
  console.log('dadasydyusdyusadsad', data);
  const response = await fetch(newApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  console.log("response",response);
  return response.json();

    // .then((data) => {
    //   console.log('data', data);
    //   // return data;
    // })
    // .catch((error) => {
    //   console.error('error', error);
    // });
};

export const GET_API = async (api) => {
  const newApi = API_HOSTNAME + api;
  const response = await fetch(newApi);
  return response.json();
};
