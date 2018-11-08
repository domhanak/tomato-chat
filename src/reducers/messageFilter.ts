import { TOMATO_APP_MESSAGE_EDITING_STARTED } from '../constants/actionTypes';
import { MessageFilter } from '../constants/MessageFilter';

export const messageFilter = (prevState: MessageFilter = MessageFilter.All, action: Action): MessageFilter => {
    switch (action.type) {
        case TOMATO_APP_MESSAGE_EDITING_STARTED:
            return action.payload.id;
        default:
            return prevState;
    }
};
