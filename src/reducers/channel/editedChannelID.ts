import {
    TOMATO_APP_CHANNEL_EDITING_STARTED,
    TOMATO_APP_CHANNEL_EDITING_CANCELLED,
    TOMATO_APP_CHANNEL_EDITING_SUCCESS
} from '../../constants/actionTypes';

export const editedChannelId = (prevState: Uuid | null = null, action: Action): Uuid | null => {
    switch (action.type) {
        case TOMATO_APP_CHANNEL_EDITING_STARTED:
        case TOMATO_APP_CHANNEL_EDITING_SUCCESS:
            return action.payload.channel.id;
        case TOMATO_APP_CHANNEL_EDITING_CANCELLED:
            return null;
        default:
            return prevState;
    }
};
