import {
    TOMATO_APP_AVATAR_LINK_FAILED,
    TOMATO_APP_AVATAR_LINK_STARTED,
    TOMATO_APP_AVATAR_LINK_SUCCESS
} from '../constants/actionTypes';

export const avatarUri = (prevState: string | null, action: Action) => {
    switch (action.type) {
        case TOMATO_APP_AVATAR_LINK_STARTED:
        case TOMATO_APP_AVATAR_LINK_FAILED:
            return null;
        case TOMATO_APP_AVATAR_LINK_SUCCESS:
            return action.payload.avatarLink;
        default:
            return prevState;
    }
};
