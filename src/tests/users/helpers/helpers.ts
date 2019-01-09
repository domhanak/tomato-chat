import {List} from 'immutable';
import {IUserServerModel} from '../../../models/IUserServerModel';
import {TOMATO_APP_USER_CHANNELS_STARTED} from '../../../constants/actionTypes';

export const userServerModelHelper = {email: 'test@test.com',
    customData: {id: 'as6d4as', selectedChannel: 'qqqqqq', nickname: 'nick',
        avatarId: 'sddadas', channels: List(['aaaaa'])}} as IUserServerModel;

export const expectedUserChannelStarted = {type: TOMATO_APP_USER_CHANNELS_STARTED};
