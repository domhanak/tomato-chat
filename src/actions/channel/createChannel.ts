import * as uuid from 'uuid';
import { Dispatch } from 'redux';
import { createChannel as createChannelApi } from '../../api/chatRepository';
import {
    TOMATO_APP_CHANNEL_CREATE_STARTED,
    TOMATO_APP_CHANNEL_CREATE_SUCCESS
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import {List} from 'immutable';
import {IMessage} from '../../models/IMessage';

const createChannelStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_STARTED,
});

const createChannelSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_SUCCESS,
    payload: {
        channel,
    }
});

export const createChannel = (name: string, order: number, messages: List<IMessage>): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(createChannelStarted());

        const channel = await createChannelApi({ id: uuid(), name, order, messages });

        dispatch(createChannelSuccess(channel));
    };
