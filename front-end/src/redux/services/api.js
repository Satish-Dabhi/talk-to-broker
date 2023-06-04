export const API_HOSTNAME = 'http://localhost:3005';
export const ADD_PROPERTY_END_POINT = '/property';
export const GET_PROPERTIES_END_POINT = '/property';
export const GET_PROPERTIES_BY_TYPE = '/property/${type}';
export const SEND_EMAIL_END_POINT = '/send-email';
export const ADD_USER_END_POINT = '/user';
export const LOGIN_USER__END_POINT = '/user/login';
export const UPDATE_USER_BY_EMAIL_END_POINT = '/user/updateUser';
export const VERIFY_VERIFICATION_CODE_END_POINT = '/user/verifyOtp';
export const VERIFY_TOKEN_END_POINT = '/user/verifyToken';



export const POST_API = async (api, data) => {
  const newApi = API_HOSTNAME + api;
  const response = await fetch(newApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const GET_API = async (api) => {
  const newApi = API_HOSTNAME + api;
  const response = await fetch(newApi);
  return response.json();
};
