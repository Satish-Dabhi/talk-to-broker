export const API_HOSTNAME = 'http://localhost:3005';
export const ADD_PROPERTY_END_POINT = '/property';
export const GET_PROPERTIES_END_POINT = '/property';
export const GET_PROPERTIES_BY_TYPE = '/property/${type}';
export const SEND_EMAIL_END_POINT = '/send-email';

export const POST_API = async (api, data) => {
  const newApi = API_HOSTNAME + api;
  console.log("dadasydyusdyusadsad",data);
  return await fetch(newApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data;
      console.log('data', data);
    })
    .catch((error) => {
      console.error('error', error);
    });
};

export const GET_API = async (api) => {
  const newApi = API_HOSTNAME + api;
  const response = await fetch(newApi);
  return response.json();
};
