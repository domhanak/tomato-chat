import { Dispatch } from 'redux';
import {
    TOMATO_APP_USER_REGISTER_STARTED, TOMATO_APP_USER_REGISTER_SUCCESS, TOMATO_APP_USER_REGISTER_FAILED
} from '../../constants/actionTypes';
import { IUser } from '../../models/IUser';
import axios from 'axios';
import {BASE_USER_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import {loadUsers} from './loadUsers';

export const registerUserStarted = (): Action => ({
    type: TOMATO_APP_USER_REGISTER_STARTED,
});

export const registerUserFailed = (): Action => ({
    type: TOMATO_APP_USER_REGISTER_FAILED,
});

export const registerUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_REGISTER_SUCCESS,
    payload: {
        user,
    }
});

const userRegistration = (authToken: AuthToken, user: IUserServerModel) => {
    return axios.post(BASE_USER_URI, JSON.stringify(user), endpointConfigHeader(authToken));
};

const createRegisterUserFactoryDependencies = {
    registerUserStarted,
    registerUserSuccess,
    registerUserFailed,
    userRegistration
};

interface IRegisterUserFactoryDependencies {
    readonly registerUserStarted: () => Action;
    readonly registerUserSuccess: (user: IUser) => Action;
    readonly registerUserFailed: () => Action;
    readonly userRegistration: (authToken: AuthToken, user: IUserServerModel) => any;
}

export const createRegisterUserFactory = (dependencies: IRegisterUserFactoryDependencies) => (authToken: AuthToken, user: IUserServerModel) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.registerUserStarted());

        return dependencies.userRegistration(authToken, user)
            .then((response: any) => {
                dispatch(dependencies.registerUserSuccess({email: response.data.email, ...response.data.customData} as IUser));
                loadUsers(authToken)(dispatch);
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.registerUserFailed());
            });
    };

export const registerUser = createRegisterUserFactory(createRegisterUserFactoryDependencies);
