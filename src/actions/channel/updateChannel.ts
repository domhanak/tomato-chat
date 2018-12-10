import { Dispatch } from 'redux';
import { updateChannel as updateChannelApi } from '../../api/chatRepository';
import { IState } from '../../common/IState';
import {
    TOMATO_APP_CHANNEL_EDITING_STARTED,
    TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    TOMATO_APP_CHANNEL_ORDER_CHANGED,
    TOMATO_APP_CHANNEL_ORDER_STARTED
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import {List} from 'immutable';

const updateChannelStarted = (id: Uuid): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_STARTED,
    payload: {
        id,
    }
});

const updateChannelSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    payload: {
        channel,
    }
});

const updateChannelOrderStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_ORDER_STARTED,
});

const updateChannelOrderSuccess = (channel: IChannel, channel2: IChannel): Action => ({
   type: TOMATO_APP_CHANNEL_ORDER_CHANGED,
   payload: {
       channel,
       channel2,
   }
});

export const updateChannel = (id: Uuid, name: string): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelStarted(id));

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        const channel = await updateChannelApi({ ...oldChannel, name });

        dispatch(updateChannelSuccess(channel));
    };

export const updateChannelUsers = (id: Uuid, users: List<Uuid>): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelStarted(id));

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        const channel = await updateChannelApi({ ...oldChannel, users });

        dispatch(updateChannelSuccess(channel));
    };

export const updateChannelOrder = (id: Uuid, order: number, id2: Uuid, order2: number): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateChannelOrderStarted());

        const oldChannel = getState().tomatoApp.channels.channelsById.get(id);
        const oldChannel2 = getState().tomatoApp.channels.channelsById.get(id2);

        const channel = await updateChannelApi({ ...oldChannel, order });
        order = order2;
        const channel2 = await updateChannelApi({ ...oldChannel2, order });

        dispatch(updateChannelOrderSuccess(channel, channel2));
    };
