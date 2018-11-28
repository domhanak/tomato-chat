import { Dispatch } from 'redux';
import { updateChannel as updateChannelApi } from '../../api/chatRepository';
import { IState } from '../../common/IState';
import {
    TOMATO_APP_CHANNEL_EDITING_STARTED, TOMATO_APP_CHANNEL_EDITING_SUCCESS, TOMATO_APP_CHANNEL_ORDER_CHANGED
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import {List} from 'immutable';
// import {IUser} from '../../models/IUser';

const updateChannelStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_STARTED,
});

const updateChannelSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    payload: {
        channel,
    }
});

const updateChannelOrderSuccess = (channels: List<Uuid>): Action => ({
   type: TOMATO_APP_CHANNEL_ORDER_CHANGED,
   payload: {
       channels,
   }
});

export const updateChannel = (id: Uuid, name: string): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelStarted());

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        const channel = await updateChannelApi({ ...oldChannel, name });

        dispatch(updateChannelSuccess(channel));
    };

export const updateChannelUsers = (id: Uuid, users: List<Uuid>): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelStarted());

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        const channel = await updateChannelApi({ ...oldChannel, users });

        dispatch(updateChannelSuccess(channel));
    };

export const updateChannelOrder = (id: Uuid, order: number): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelStarted());

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        /*const channel = */
        await updateChannelApi({ ...oldChannel, order });

        dispatch(updateChannelOrderSuccess(getState().tomatoApp.channels.allChannelIds));
    };
