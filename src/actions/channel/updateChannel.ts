import { Dispatch } from 'redux';
import { updateChannel as updateChannelApi } from '../../api/chatRepository';
import { IState } from '../../common/IState';
import {
    TOMATO_APP_CHANNEL_EDITING_STARTED, TOMATO_APP_CHANNEL_EDITING_SUCCESS
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import {List} from 'immutable';
import {IUser} from '../../models/IUser';

const updateChannelStarted = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_STARTED,
    payload: {
        channel
    }
});

const updateChannelSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    payload: {
        channel,
    }
});

export const updateChannel = (id: Uuid, name: string): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);

        dispatch(updateChannelStarted(oldChannel));
        const channel = await updateChannelApi({ ...oldChannel, name });

        dispatch(updateChannelSuccess(channel));
    };

export const updateChannelUsers = (id: Uuid, users: List<IUser>): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);

        dispatch(updateChannelStarted(oldChannel));
        const channel = await updateChannelApi({ ...oldChannel, users });

        dispatch(updateChannelSuccess(channel));
    };

