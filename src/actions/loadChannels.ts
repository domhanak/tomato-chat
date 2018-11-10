import { Dispatch } from 'redux';
import {getChannels} from '../api/chatRepository';
import {
    TOMATO_APP_LOADING_CHANNELS_STARTED, TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from '../constants/actionTypes';
import {IChannel} from '../models/IChannel';

const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_CHANNELS_STARTED,
});

const loadingSuccess = (channels: ReadonlyArray<IChannel>): Action => ({
    type: TOMATO_APP_LOADING_CHANNELS_SUCCESS,
    payload: {
        channels,
    }
});

export const loadChannels = (): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(loadingStarted());
        const channels = await getChannels();
        dispatch(loadingSuccess(channels));
    };
