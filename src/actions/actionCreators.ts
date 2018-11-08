import {
    TOMATO_APP_MESSAGE_EDITING_CANCELLED, TOMATO_APP_MESSAGE_EDITING_STARTED,
} from '../constants/actionTypes';

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
