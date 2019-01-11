import { Dispatch } from 'redux';
import {
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_CHANNELS_STARTED,
    TOMATO_APP_USER_UPDATE_FAILED,
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import axios from 'axios';
import {GET_USER_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import {getDownloadLinkApiCall} from '../files/getDownloadLink';
import {errorMessageUserUpdate} from '../../constants/errorMessages';

export const updateUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user,
    }
});

export const updateUserStarted = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_STARTED,
});

export const updateUserFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_USER_UPDATE_FAILED,
    payload: errorMessage
});

const userUpdate = (authToken: AuthToken, user: IUserServerModel) => {
    return axios.put(GET_USER_URI(user.email), JSON.stringify(user), endpointConfigHeader(authToken));
};

const createUpdateUserFactoryDependencies = {
    updateUserSuccess,
    updateUserStarted,
    userUpdate,
    updateUserFailed,
    getDownloadLinkApiCall
};

interface IUpdateUserFactoryDependencies {
    readonly updateUserFailed: (errorMessage: string | null) => Action;
    readonly updateUserStarted: () => Action;
    readonly updateUserSuccess: (user: IUser) => Action;
    readonly userUpdate: (authToken: AuthToken, user: IUserServerModel) => any;
    readonly getDownloadLinkApiCall: (fileId: Uuid, authToken: AuthToken) => any;
}

export const createUserUpdateFactory = (dependencies: IUpdateUserFactoryDependencies) =>
    (authToken: AuthToken, user: IUserServerModel) => (dispatch: Dispatch) => {
    dispatch(dependencies.updateUserStarted());
    return dependencies.userUpdate(authToken, user)
        .then((response: any) => {
            const responseUser: IUserServerModel = (response.data as IUserServerModel);
            return dependencies.getDownloadLinkApiCall(responseUser.customData.avatarId, authToken)
                .then((responseDownLink: any) => {
                    dispatch(dependencies.updateUserSuccess({email: responseUser.email,
                        ...responseUser.customData, avatarUrl: responseDownLink.data.fileUri} as IUser));
                })
                .catch((error: any) => {
                    console.log(error);
                    dispatch(dependencies.updateUserFailed(errorMessageUserUpdate));
                });
        })
        .catch((error: any) => {
            console.log(error);
            dispatch(dependencies.updateUserFailed(errorMessageUserUpdate));
        });
};

export const updateUser = createUserUpdateFactory(createUpdateUserFactoryDependencies);
