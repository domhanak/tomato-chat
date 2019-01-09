// import {
//     TOMATO_APP_AVATAR_LINK_STARTED,
//     TOMATO_APP_AVATAR_LINK_FAILED,
//     TOMATO_APP_AVATAR_LINK_SUCCESS
// } from '../../constants/actionTypes';
import axios from 'axios';
import {GET_FILE_DOWNLOADLINK_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

// const getAvatarLinkStarted = (): Action => ({
//     type: TOMATO_APP_AVATAR_LINK_STARTED,
// });
//
// const getAvatarLinkFailed = (): Action => ({
//     type: TOMATO_APP_AVATAR_LINK_FAILED,
// });
//
// const getAvatarLinkSuccess = (avatarLink: string): Action => ({
//     type: TOMATO_APP_AVATAR_LINK_SUCCESS,
//     payload: {
//         avatarLink,
//     }
// });

export const getDownloadLinkApiCall = (fileId: Uuid, authToken: AuthToken) => {
    return axios.get(GET_FILE_DOWNLOADLINK_URI(fileId), endpointConfigHeader(authToken));
};
