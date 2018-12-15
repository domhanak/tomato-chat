import {
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED,
    TOMATO_APP_USER_LOGIN_STARTED
} from '../../constants/actionTypes';
import {Dispatch} from 'redux';
import axios from 'axios';
import {USER_AUTH_URI} from '../../constants/apiConstants';
import {config} from '../../common/utils/getEndpointHeaderConfig';

const userAuthenticateSuccess = (authenticationToken: String): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    payload: {
        authenticator: `Bearer ${authenticationToken}`
    }
});

const updateUserStarted = (): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_STARTED,
});

const userAuthenticationFailed = (): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
});

export const authenticateUser = (email: String): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(updateUserStarted());

        const data = {
            email: `${email}`
        };

        return axios.post(USER_AUTH_URI, data, config)
            .then((response) => {
                dispatch(userAuthenticateSuccess(response.data.token));
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
                dispatch(userAuthenticationFailed());
            });
    };
