import { Dispatch } from 'redux';
import {
    TOMATO_APP_AVATAR_LINK_STARTED,
    TOMATO_APP_AVATAR_LINK_FAILED,
    TOMATO_APP_AVATAR_LINK_SUCCESS
} from '../../constants/actionTypes';
import axios from 'axios';
import {GET_FILE_DOWNLOADLINK_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

const getAvatarLinkStarted = (): Action => ({
    type: TOMATO_APP_AVATAR_LINK_STARTED,
});

const getAvatarLinkFailed = (): Action => ({
    type: TOMATO_APP_AVATAR_LINK_FAILED,
});

const getAvatarLinkSuccess = (avatarLink: string): Action => ({
    type: TOMATO_APP_AVATAR_LINK_SUCCESS,
    payload: {
        avatarLink,
    }
});

export const getDownloadLinkApiCall = (fileId: Uuid, authToken: AuthToken) => {
    return axios.get(GET_FILE_DOWNLOADLINK_URI(fileId), endpointConfigHeader(authToken));
};

const createGetDownloadLinkFactoryDependencies = {
    getAvatarLinkStarted,
    getAvatarLinkFailed,
    getAvatarLinkSuccess,
    getDownloadLinkApiCall
};

interface IGetDownloadLinkFactoryDependencies {
    readonly getAvatarLinkStarted: () => Action;
    readonly getAvatarLinkFailed: () => Action;
    readonly getAvatarLinkSuccess: (avatarLink: string) => Action;
    readonly getDownloadLinkApiCall: (fileId: Uuid, authToken: AuthToken) => any;
}

const createGetDownloadLinkFactory = (dependencies: IGetDownloadLinkFactoryDependencies) =>
    (authToken: AuthToken, fileId: Uuid) =>
    (dispatch: Dispatch) => {
        dispatch(dependencies.getAvatarLinkStarted());
        return dependencies.getDownloadLinkApiCall(fileId, authToken)
            .then((response: any) => {
                dispatch(dependencies.getAvatarLinkSuccess(response.data.fileUri));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.getAvatarLinkFailed());
            });
    };

export const getDownloadLink = createGetDownloadLinkFactory(createGetDownloadLinkFactoryDependencies);
