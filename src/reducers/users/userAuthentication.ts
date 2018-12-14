import {TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED} from '../../constants/actionTypes';

export const userAuthentication = (prevState: string | null, action: Action): string | null => {
    switch (action.type) {
        case TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED:
            console.log(action.payload.authenticator);
            return action.payload.authenticator;
        default:
            return prevState;
    }
};
