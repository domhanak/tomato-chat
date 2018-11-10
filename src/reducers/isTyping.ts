import {
    TOMATO_APP_MESSAGE_CREATE_STARTED,
    TOMATO_APP_MESSAGE_CREATE_IN_PROGRESS,
    TOMATO_APP_MESSAGE_CREATE_SUCCESS,
    TOMATO_APP_MESSAGE_EDITING_STARTED,
    TOMATO_APP_MESSAGE_EDITING_SUCCESS,
    TOMATO_APP_MESSAGE_EDITING_CANCELLED
} from '../constants/actionTypes';

export const isTyping = (prevState = false, action: Action): boolean => {
    switch (action.type) {
        case TOMATO_APP_MESSAGE_CREATE_STARTED:
        case TOMATO_APP_MESSAGE_EDITING_STARTED:
        case TOMATO_APP_MESSAGE_CREATE_IN_PROGRESS:
            return true;
        case TOMATO_APP_MESSAGE_CREATE_SUCCESS:
        case TOMATO_APP_MESSAGE_EDITING_SUCCESS:
        case TOMATO_APP_MESSAGE_EDITING_CANCELLED:
            return false;
        default:
            return prevState;
    }
};
