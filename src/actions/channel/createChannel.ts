import { Dispatch } from 'redux';
import {createChannel as createChannelApi} from '../../api/chatRepository';
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

export const createChannel = (id: Uuid, name: string, order: number, messages: List<IMessage>, users: List<Uuid>, owner: Uuid): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(createChannelStarted());

        const channel = await createChannelApi({ id, name, order, messages, users, owner });

        dispatch(createChannelSuccess(channel));
    };
