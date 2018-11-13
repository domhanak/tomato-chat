import {
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGIN_SUCCESS
} from '../../constants/actionTypes';

export const userId = (prevState: Uuid | null = null, action: Action): Uuid | null => {
    switch (action.type) {
        case TOMATO_APP_USER_LOGIN_SUCCESS:
            return action.payload.user;
        case TOMATO_APP_USER_LOGIN_FAILED:
            return null;
        default:
            return prevState;
    }
};
