import { Dispatch } from 'redux';
import { getMessages } from '../api/chatRepository';
import {
    TOMATO_APP_LOADING_MESSAGES_STARTED, TOMATO_APP_LOADING_MESSAGES_SUCCESS
} from '../constants/actionTypes';
import {IMessage} from '../models/IMessage';

const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_MESSAGES_STARTED,
});

const loadingSuccess = (messages: ReadonlyArray<IMessage>): Action => ({
    type: TOMATO_APP_LOADING_MESSAGES_SUCCESS,
    payload: {
        messages,
    }
});

export const loadMessages = (): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(loadingStarted());
        const messages = await getMessages();
        dispatch(loadingSuccess(messages));
    };
