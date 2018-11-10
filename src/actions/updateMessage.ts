import { Dispatch } from 'redux';
import { updateMessage as updateMessageApi } from '../api/chatRepository';
import { IState } from '../common/IState'
import {
    TOMATO_APP_MESSAGE_EDITING_STARTED, TOMATO_APP_MESSAGE_EDITING_SUCCESS
} from '../constants/actionTypes';
import {IMessage} from '../models/IMessage';

const updateMessageStarted = (): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_STARTED,
});

const updateMessageSuccess = (message: IMessage): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_SUCCESS,
  payload: {
      message,
  }
});

export const updateMessage = (id: Uuid, text: string): any =>
  async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
    dispatch(updateMessageStarted());

    const oldMessage = getState().tomatoApp.messages.messagesById.get(id);
    const message = await updateMessageApi({ ...oldMessage, text });

    dispatch(updateMessageSuccess(message));
  };

