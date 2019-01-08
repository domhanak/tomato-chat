import {List} from 'immutable';
import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {IChannel} from '../../../models/IChannel';
import {IChannelServerModelResponse} from '../../../models/IChannelServerModelResponse';

export const authTokenHelper = 'Bearer jwtSecret';

export const channelServerModel = {name: 'name', customData: {name: 'name', messages: List(), owner: 'as6d4as',
        users: List(['as6d4as'])}} as IChannelServerModel;

export const channelServerModelResponse = {id: 'd5dfs-dfd', name: 'name', customData: {name: 'name', messages: List(), owner: 'as6d4as',
        users: List(['as6d4as'])}} as IChannelServerModelResponse;

export const channelHelper = { id: 'd5dfs-dfd', messages: List(), name: 'name', owner: 'as6d4as',
                         users: List(['as6d4as'])} as IChannel;

export const dispatch = jest.fn((action) => action);
