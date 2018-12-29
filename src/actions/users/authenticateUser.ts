import {
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED,
    TOMATO_APP_USER_LOGIN_STARTED,
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_LOGIN_FAILED
} from '../../constants/actionTypes';
import {Dispatch} from 'redux';
import axios from 'axios';
import {GET_USER_URI, USER_AUTH_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {getDownloadLink} from '../files/getDownloadLink';

const userAuthenticateSuccess = (authenticationToken: String): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    payload: {
        authenticator: authenticationToken
    }
});

const userAuthenticationStarted = (): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_STARTED,
});

const userAuthenticationFailed = (): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
});

const logUserStarted = (): Action => ({
    type: TOMATO_APP_USER_LOGIN_STARTED,
});

const logUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user
    }
});

const logUserFailed = (): Action => ({
    type: TOMATO_APP_USER_LOGIN_FAILED,
});

const authenticateUser = (email: String) => {
    const data = JSON.stringify({email});

    return axios.post(USER_AUTH_URI, data, endpointConfigHeader());
};

const logUser = (email: string, authToken: string) => {
    return axios.get(GET_USER_URI(email), endpointConfigHeader(authToken));
};

const createAuthenticationFactoryDependencies = {
    authenticationStarted: userAuthenticationStarted,
    authenticateSuccess: userAuthenticateSuccess,
    authenticationFailed: userAuthenticationFailed,
    authenticateUser,
    logUser,
    logUserStarted,
    logUserSuccess,
    logUserFailed
};

interface ICreateAuthenticationFactoryDependencies {
    readonly authenticationStarted: () => Action;
    readonly authenticateSuccess: (authenticationToken: String) => Action;
    readonly authenticationFailed: () => Action;
    readonly authenticateUser: (email: string) => any;
    readonly logUser: (email: string, authToken: string) => any;
    readonly logUserStarted: () => Action;
    readonly logUserSuccess: (user: IUser) => Action;
    readonly logUserFailed: () => Action;
}

const createAuthenticationFactory = (dependencies: ICreateAuthenticationFactoryDependencies) => (email: string) =>
    (dispatch: Dispatch): any => {
    dispatch(dependencies.authenticationStarted());

    return dependencies.authenticateUser(email)
        .then((response: any) => {
            const authToken = `Bearer ${response.data.token}`;

            dispatch(dependencies.authenticateSuccess(authToken));
            dispatch(dependencies.logUserStarted());

            return dependencies.logUser(email, authToken)
                .then((responselogUser: any) => {
                    const logUserResponse: IUserServerModel = responselogUser.data as IUserServerModel;

                    dispatch(dependencies.logUserSuccess({
                        email: logUserResponse.email,
                        ...logUserResponse.customData} as IUser));

                    if (logUserResponse.customData.avatarId) {
                        getDownloadLink(authToken, logUserResponse.customData.avatarId)(dispatch);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                    dispatch(dependencies.logUserFailed());
                });
        })
        .catch((error: any) => {
            console.log(error);
            dispatch(dependencies.authenticationFailed());
        });
};

export const authenticate = createAuthenticationFactory(createAuthenticationFactoryDependencies);
