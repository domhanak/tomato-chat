import {
    TOMATO_APP_CHANNEL_EDITING_CANCELLED,
    TOMATO_APP_CHANNEL_EDITING_STARTED,
    TOMATO_APP_MESSAGE_EDITING_CANCELLED, TOMATO_APP_MESSAGE_EDITING_STARTED,
} from '../constants/actionTypes';

// ------------------------ MESSAGES ------------------------
export const cancelEditingMessage = (id: Uuid): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_CANCELLED,
  payload: {
    id,
  }
});

export const startEditingMessage = (id: Uuid): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_STARTED,
  payload: {
    id,
  }
});

// ------------------------ CHANNELS ------------------------
export const cancelEditingChannel = (id: Uuid): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_CANCELLED,
    payload: {
        id,
    }
});

export const startEditingChannel = (id: Uuid): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_STARTED,
    payload: {
        id,
    }
});
