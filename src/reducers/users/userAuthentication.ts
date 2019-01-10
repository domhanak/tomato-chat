import {
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED, TOMATO_APP_USER_LOGOUT_STARTED, TOMATO_APP_USER_LOGOUT_SUCCESS
} from '../../constants/actionTypes';

export const userAuthentication = (prevState: string | null, action: Action): string | null => {
    switch (action.type) {
        case TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED:
            return action.payload.authenticator;
        case TOMATO_APP_AUTHENTICATION_TOKEN_STARTED:
        case TOMATO_APP_AUTHENTICATION_TOKEN_FAILED:
        case TOMATO_APP_USER_LOGOUT_SUCCESS:
            return null;
        case TOMATO_APP_USER_LOGOUT_STARTED:
        default:
            return prevState;
    }
};
