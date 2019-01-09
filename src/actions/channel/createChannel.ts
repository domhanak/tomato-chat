import { Dispatch } from 'redux';
import {
    TOMATO_APP_CHANNEL_CREATE_STARTED,
    TOMATO_APP_CHANNEL_CREATE_SUCCESS,
    TOMATO_APP_CHANNEL_CREATE_FAILED
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import axios from 'axios';
import {BASE_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader, responseChannelMapper} from '../../common/utils/utilFunctions';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {updateUser} from '../users/updateUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {List} from 'immutable';

export const channelCreateStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_STARTED,
});

export const channelCreateFailed = (): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_FAILED,
});

export const channelCreateSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_SUCCESS,
    payload: {
        channel,
    }
});

const channelCreate = (authToken: AuthToken, channel: IChannelServerModel) => {
    return axios.post(BASE_CHANNEL_URI, JSON.stringify(channel), endpointConfigHeader(authToken));
};

const createChannelCreateFactoryDependencies = {
    channelCreateStarted,
    channelCreateFailed,
    channelCreateSuccess,
    channelCreate
};

export interface ICreateChannelFactoryDependencies {
    readonly channelCreateStarted: () => Action;
    readonly channelCreateFailed: () => Action;
    readonly channelCreateSuccess: (channel: IChannel) => Action;
    readonly channelCreate: (authToken: AuthToken, channel: IChannelServerModel) => any;
}

export const createChannelCreateFactory = (dependencies: ICreateChannelFactoryDependencies) => (authToken: AuthToken, channel: IChannelServerModel, user: IUserServerModel) =>
   (dispatch: Dispatch): any => {
        dispatch(dependencies.channelCreateStarted());

        return dependencies.channelCreate(authToken, channel)
            .then((response: any) => {
                const createdChannel: IChannel = responseChannelMapper(response.data);
                dispatch(dependencies.channelCreateSuccess(createdChannel));

                const userToUpdate: IUserServerModel = {email: user.email, customData: {...user.customData,
                        channels: List(user.customData.channels).push(createdChannel.id)}} as IUserServerModel;
                updateUser(authToken, userToUpdate)(dispatch);
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.channelCreateFailed());
            });
    };

export const createChannel = createChannelCreateFactory(createChannelCreateFactoryDependencies);
