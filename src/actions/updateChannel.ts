import { Dispatch } from 'redux';
import { updateChannel as updateChannelApi } from '../api/chatRepository';
import { IState } from '../common/IState';
import {
    TOMATO_APP_CHANNEL_EDITING_STARTED, TOMATO_APP_CHANNEL_EDITING_SUCCESS
} from '../constants/actionTypes';
import {IChannel} from '../models/IChannel';

const updateChannelStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_STARTED,
});

const updateChannelSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    payload: {
        channel,
    }
});

export const updateChannel = (id: Uuid, name: string): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelStarted());

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        const channel = await updateChannelApi({ ...oldChannel, name });

        dispatch(updateChannelSuccess(channel));
    };

