import * as uuid from 'uuid';
import { Dispatch } from 'redux';
import { createMessage as createMessageApi } from '../../api/chatRepository';
import {
    TOMATO_APP_MESSAGE_CREATE_STARTED,
    TOMATO_APP_MESSAGE_CREATE_SUCCESS
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';

const createMessageStarted = (): Action => ({
    type: TOMATO_APP_MESSAGE_CREATE_STARTED,
});

const createMessageSuccess = (message: IMessage): Action => ({
    type: TOMATO_APP_MESSAGE_CREATE_SUCCESS,
    payload: {
        message,
    }
});

export const createMessage = (text: string, from: Uuid): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(createMessageStarted());

        const message = await createMessageApi({ id: uuid(), from: from, text });

        dispatch(createMessageSuccess(message));
    };
