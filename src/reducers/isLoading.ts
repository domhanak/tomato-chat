import {
    TOMATO_APP_USER_LOGIN_STARTED, TOMATO_APP_USER_LOGIN_SUCCESS,
} from '../constants/actionTypes';

export const isLoading = (prevState = false, action: Action): boolean => {
    switch (action.type) {
        case TOMATO_APP_USER_LOGIN_STARTED:
            return true;

        case TOMATO_APP_USER_LOGIN_SUCCESS:
            return false;

        default:
            return prevState;
    }
};
