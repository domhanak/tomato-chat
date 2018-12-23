/**
 * Base API constants
 */
const API_URI = 'https://pv247messaging.azurewebsites.net/api/v2';
const API_URI_WITH_APP = 'https://pv247messaging.azurewebsites.net/api/v2/app';
const APP_ID = 'f9529c4a-7875-45a9-8a5e-606f682f435e';

/**
 * User API constants
 * @param email email of user
 */
export const USER_AUTH_URI = `${API_URI}/auth`;
export const BASE_USER_URI = `${API_URI}/${APP_ID}/user`;
export const GET_USER_URI = (email: string) => `${BASE_USER_URI}/${email}`;

/**
 * Channel API constants
 * @param id id of the channel
 */
export const BASE_CHANNEL_URI = `${API_URI_WITH_APP}/${APP_ID}/channel`;
export const GET_CHANNEL_URI = (id: Uuid) => `${BASE_CHANNEL_URI}/${id}`;

/**
 * File API constants
 */
export const CREATE_FILE_URI = `${API_URI}/file`;

/**
 * Message API constants
 * @param channelId ID of the channel that we want messages from
 * @constructor
 */
export const BASE_MESSAGE_URI = (channelId: Uuid) => `${API_URI_WITH_APP}/${APP_ID}/channel/${channelId}/message`;
export const BASE_MESSAGE_FROM_CHANNEL_URI = (channelId: Uuid, messageId: Uuid) => `${API_URI_WITH_APP}/${APP_ID}/channel/${channelId}/message/${messageId}`;
