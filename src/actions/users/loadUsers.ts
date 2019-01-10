import axios from 'axios';
import {
    TOMATO_APP_LOADING_USERS_FAILED,
    TOMATO_APP_LOADING_USERS_STARTED,
    TOMATO_APP_LOADING_USERS_SUCCESS
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import {BASE_USER_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {Dispatch} from 'redux';
import {IUserServerModel} from '../../models/IUserServerModel';
import {getDownloadLinkApiCall} from '../files/getDownloadLink';
import {errorMessageLoadingUsers} from '../../constants/errorMessages';

export const loadingFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_LOADING_USERS_FAILED,
    payload: errorMessage
});

export const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_USERS_STARTED,
});

export const loadingSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_LOADING_USERS_SUCCESS,
    payload: {
        user,
    }
});

const loadAllUsers = (authToken: AuthToken) => {
    return axios.get(BASE_USER_URI, endpointConfigHeader(authToken));
};

const createLoadAllUsersFactoryDependencies = {
    loadingStarted,
    loadingSuccess,
    loadingFailed,
    loadAllUsers,
    getDownloadLinkApiCall
};

interface ILoadAllUsersFactoryDependencies {
    readonly loadingStarted: () => Action;
    readonly loadingSuccess: (user: IUser) => Action;
    readonly loadingFailed: (errorMessage: string | null) => Action;
    readonly loadAllUsers: (authToken: AuthToken) => any;
    readonly getDownloadLinkApiCall: (fileId: Uuid, authToken: AuthToken) => any;
}

export const createLoadAllUsersFactory = (dependencies: ILoadAllUsersFactoryDependencies) => (authToken: AuthToken) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());
        // const users: IUser[] = [];
        return dependencies.loadAllUsers(authToken)
            .then((response: any) => {
                response.data.forEach((serverData: IUserServerModel) => {
                    return dependencies.getDownloadLinkApiCall(serverData.customData.avatarId, authToken)
                            .then((responseDownLink: any) => {
                                dispatch(dependencies.loadingSuccess(({email: serverData.email, ...serverData.customData,
                                    avatarUrl: responseDownLink.data.fileUri} as IUser)));
                            })
                            .catch((error: any) => {
                                console.log(error);
                                dispatch(dependencies.loadingFailed(errorMessageLoadingUsers));
                            });
                });
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.loadingFailed(errorMessageLoadingUsers));
        });
    };

export const loadUsers = createLoadAllUsersFactory(createLoadAllUsersFactoryDependencies);
