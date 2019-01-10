import {
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_CHANNEL_CREATE_FAILED,
    TOMATO_APP_CHANNEL_DELETE_FAILED,
    TOMATO_APP_CHANNEL_EDITING_FAILED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_FAILED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS,
    TOMATO_APP_FILE_CREATE_FAILED,
    TOMATO_APP_GET_FILE_FAILED,
    TOMATO_APP_LOADING_CHANNELS_FAILED,
    TOMATO_APP_LOADING_MESSAGES_FAILED,
    TOMATO_APP_LOADING_USERS_FAILED,
    TOMATO_APP_MESSAGE_CREATE_FAILED,
    TOMATO_APP_MESSAGE_DELETE_FAILED,
    TOMATO_APP_MESSAGE_EDITING_FAILED,
    TOMATO_APP_MESSAGE_UPDATE_FAILED,
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGOUT_FAILED,
    TOMATO_APP_USER_REGISTER_FAILED,
    TOMATO_APP_USER_UPDATE_FAILED
} from '../../../constants/actionTypes';
import {errorMessage} from '../../../reducers/errorMessage';

describe('errorMessage reducer test', () => {
    const actions = [TOMATO_APP_MESSAGE_EDITING_FAILED,
        TOMATO_APP_CHANNEL_EDITING_FAILED,
        TOMATO_APP_LOADING_USERS_FAILED,
        TOMATO_APP_LOADING_CHANNELS_FAILED,
        TOMATO_APP_LOADING_MESSAGES_FAILED,
        TOMATO_APP_USER_LOGIN_FAILED,
        TOMATO_APP_USER_LOGOUT_FAILED,
        TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
        TOMATO_APP_USER_UPDATE_FAILED,
        TOMATO_APP_USER_REGISTER_FAILED,
        TOMATO_APP_MESSAGE_CREATE_FAILED,
        TOMATO_APP_MESSAGE_UPDATE_FAILED,
        TOMATO_APP_MESSAGE_DELETE_FAILED,
        TOMATO_APP_CHANNEL_CREATE_FAILED,
        TOMATO_APP_CHANNEL_DELETE_FAILED,
        TOMATO_APP_FILE_CREATE_FAILED,
        TOMATO_APP_GET_FILE_FAILED,
        TOMATO_APP_CLEAR_ERROR_MESSAGE_FAILED];

    const errorMessageText = 'errorMessage';

    it('should return errorMessage', () => {
        actions.forEach((item: string) => {
            expect(errorMessage(null, {type: item, payload: errorMessageText}))
                .toEqual(errorMessageText);
        });
    });

    it('should return null', () => {
        expect(errorMessage(errorMessageText, {type: TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS}))
            .toBeNull();
    });

    it('should return previous state', () => {
        const prevState = 'prevState';
        expect(errorMessage(prevState,
            {type: TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED, payload: errorMessageText}))
            .toEqual(prevState);
    });
});
