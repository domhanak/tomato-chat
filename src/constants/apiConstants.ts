const API_URI = 'https://pv247messaging.azurewebsites.net/api/v2';
const APP_ID = 'f9529c4a-7875-45a9-8a5e-606f682f435e';
export const USER_AUTH_URI = `${API_URI}/auth`;
export const GET_USER_URI = (email: string) => `${API_URI}/${APP_ID}/user/${email}`;
export const GET_ALL_USERS_URI = `${API_URI}/${APP_ID}/user`;
