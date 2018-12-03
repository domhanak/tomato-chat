import {
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_CHANNELS_FAILED,
    TOMATO_APP_USER_CHANNELS_SUCCESS
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';

export const userId = (prevState: Uuid | null = null, action: Action): Uuid | null => {
    switch (action.type) {
        case TOMATO_APP_USER_LOGIN_SUCCESS:
            return action.payload.user.id;
        case TOMATO_APP_USER_LOGIN_FAILED:
            return null;
        default:
            return prevState;
    }
};

export const user = (prevState: IUser | null = null, action: Action): IUser | null => {
    switch (action.type) {
        case TOMATO_APP_USER_CHANNELS_SUCCESS:
        case TOMATO_APP_USER_LOGIN_SUCCESS:
            return action.payload.user;
        case TOMATO_APP_USER_CHANNELS_FAILED:
        case TOMATO_APP_USER_LOGIN_FAILED:
            return null;
        default:
            return prevState;
    }
};
