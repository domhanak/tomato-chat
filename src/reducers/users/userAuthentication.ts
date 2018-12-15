import {
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED
} from '../../constants/actionTypes';

export const userAuthentication = (prevState: string | null, action: Action): string | null => {
    switch (action.type) {
        case TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED:
            return action.payload.authenticator;
        case TOMATO_APP_AUTHENTICATION_TOKEN_STARTED:
        case TOMATO_APP_AUTHENTICATION_TOKEN_FAILED:
            return null;
        default:
            return prevState;
    }
};
