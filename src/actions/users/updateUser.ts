import { Dispatch } from 'redux';
import {
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_CHANNELS_STARTED,
    TOMATO_APP_USER_CHANNELS_FAILED,
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import axios from 'axios';
import {GET_USER_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import {getDownloadLinkApiCall} from '../files/getDownloadLink';

const updateUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user,
    }
});

const updateUserStarted = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_STARTED,
});

const updateUserFailed = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_FAILED,
});

const userUpdate = (authToken: AuthToken, user: IUserServerModel) => {
    return axios.put(GET_USER_URI(user.email), JSON.stringify(user), endpointConfigHeader(authToken));
};

const createUpdateUserFactoryDependencies = {
    updateUserSuccess,
    updateUserStarted,
    userUpdate,
    updateUserFailed,
};

interface IUpdateUserFactoryDependencies {
    readonly updateUserFailed: () => Action;
    readonly updateUserStarted: () => Action;
    readonly updateUserSuccess: (user: IUser) => Action;
    readonly userUpdate: (authToken: AuthToken, user: IUserServerModel) => any;
}

const createUserUpdateFactory = (dependencies: IUpdateUserFactoryDependencies) =>
    (authToken: AuthToken, user: IUserServerModel) => (dispatch: Dispatch) => {
    dispatch(dependencies.updateUserStarted());
    return dependencies.userUpdate(authToken, user)
        .then((response: any) => {
            const responseUser: IUserServerModel = (response.data as IUserServerModel);
            return getDownloadLinkApiCall(responseUser.customData.avatarId, authToken)
                .then((responseDownLink: any) => {
                    dispatch(dependencies.updateUserSuccess({email: responseUser.email,
                        ...responseUser.customData, avatarUrl: responseDownLink.data.fileUri} as IUser));
                })
                .catch((error: any) => {
                    console.log(error);
                    dispatch(dependencies.updateUserFailed());
                });
        })
        .catch((error: any) => {
            console.log(error);
            dispatch(dependencies.updateUserFailed());
        });
};

export const updateUser = createUserUpdateFactory(createUpdateUserFactoryDependencies);
