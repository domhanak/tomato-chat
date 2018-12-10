import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import { IChannels } from '../../models/ITomatoApp';
import { IChannel } from '../../models/IChannel';
import {
    TOMATO_APP_CHANNEL_CREATE_SUCCESS, TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    TOMATO_APP_LOADING_CHANNELS_STARTED, TOMATO_APP_LOADING_CHANNELS_SUCCESS,
    TOMATO_APP_CHANNEL_ORDER_CHANGED, TOMATO_APP_CHANNEL_ORDER_STARTED
} from '../../constants/actionTypes';

const channelsById = (prevState = Immutable.Map<Uuid, IChannel>(), action: Action): Immutable.Map<Uuid, IChannel> => {
    switch (action.type) {
        case TOMATO_APP_LOADING_CHANNELS_STARTED:
            return prevState;
        case TOMATO_APP_LOADING_CHANNELS_SUCCESS:
            return Immutable.Map(action.payload.channels.map((channel: IChannel) => [channel.id, channel]));
        case TOMATO_APP_CHANNEL_ORDER_STARTED:
            return prevState;
        case TOMATO_APP_CHANNEL_ORDER_CHANGED:
            const actualState = prevState.set(action.payload.channel.id, action.payload.channel);
            return actualState.set(action.payload.channel2.id, action.payload.channel2);
        case TOMATO_APP_CHANNEL_CREATE_SUCCESS:
        case TOMATO_APP_CHANNEL_EDITING_SUCCESS:
            return prevState.set(action.payload.channel.id, action.payload.channel);
        default:
            return prevState;
    }
};

const allChannelIds = (prevState: Immutable.List<Uuid> = Immutable.List(), action: Action): Immutable.List<Uuid> => {
    switch (action.type) {
        case TOMATO_APP_LOADING_CHANNELS_STARTED:
            return prevState;
        case TOMATO_APP_LOADING_CHANNELS_SUCCESS:
            return Immutable.List(action.payload.channels.map((channel: IChannel) => channel.id));
        case TOMATO_APP_CHANNEL_CREATE_SUCCESS:
            return prevState.push(action.payload.channel.id);
        default:
            return prevState;
    }
};

export const channels = combineReducers<IChannels>({
    allChannelIds,
    channelsById,
});
