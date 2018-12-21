import {
    TOMATO_APP_MESSAGE_EDITING_STARTED,
    TOMATO_APP_MESSAGE_EDITING_CANCELLED,
    TOMATO_APP_MESSAGE_EDITING_SUCCESS, TOMATO_APP_MESSAGE_UPDATE_STARTED
} from '../../constants/actionTypes';

export const editedMessageId = (prevState: Uuid | null = null, action: Action): Uuid | null => {
    switch (action.type) {
        case TOMATO_APP_MESSAGE_EDITING_STARTED:
        case TOMATO_APP_MESSAGE_EDITING_SUCCESS:
            return action.payload.id;
        case TOMATO_APP_MESSAGE_UPDATE_STARTED:
        case TOMATO_APP_MESSAGE_EDITING_CANCELLED:
            return null;
        default:
            return prevState;
    }
};
