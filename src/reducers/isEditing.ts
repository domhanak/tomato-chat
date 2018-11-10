import {
    TOMATO_APP_MESSAGE_EDITING_STARTED,
    TOMATO_APP_MESSAGE_EDITING_SUCCESS,
    TOMATO_APP_MESSAGE_EDITING_CANCELLED
} from '../constants/actionTypes';

export const isEditing = (prevState = false, action: Action): boolean => {
    switch (action.type) {
        case TOMATO_APP_MESSAGE_EDITING_STARTED:
            return true;
        case TOMATO_APP_MESSAGE_EDITING_SUCCESS:
        case TOMATO_APP_MESSAGE_EDITING_CANCELLED:
            return false;
        default:
            return prevState;
    }
};
