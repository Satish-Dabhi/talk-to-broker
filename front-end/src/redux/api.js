export const API_HOSTNAME = 'http://localhost:3005';
export const ADD_PROPERTY_END_POINT = '/property';

export const handlePostApi = async ({ api, data }) => {
    const newApi = API_HOSTNAME + api;
    return await fetch(newApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((data) => {
            console.log("data", data);
        })
        .catch((error) => {
            console.error("error", error);
        });
}