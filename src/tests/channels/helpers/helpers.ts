import {List} from 'immutable';
import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {IChannel} from '../../../models/IChannel';
import {IChannelServerModelResponse} from '../../../models/IChannelServerModelResponse';
import {TOMATO_APP_LOADING_CHANNELS_STARTED} from '../../../constants/actionTypes';

export const channelServerModel = {name: 'name', customData: {name: 'name', messages: List(), owner: 'as6d4as',
        users: List(['as6d4as'])}} as IChannelServerModel;

export const channelServerModelResponse = {id: 'd5dfs-dfd', name: 'name', customData: {name: 'name', messages: List(), owner: 'as6d4as',
        users: List(['as6d4as'])}} as IChannelServerModelResponse;

export const channelHelper = { id: 'd5dfs-dfd', messages: List(), name: 'name', owner: 'as6d4as',
                         users: List(['as6d4as'])} as IChannel;

export const expectedLoadingChannelsStarted = {type: TOMATO_APP_LOADING_CHANNELS_STARTED};

export const loadAllChannelsTest = (authToken: AuthToken) => {
    console.log(authToken);
    return Promise.resolve({data: [channelServerModelResponse]});
};
