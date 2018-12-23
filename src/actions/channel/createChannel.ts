import { Dispatch } from 'redux';
import {
    TOMATO_APP_CHANNEL_CREATE_STARTED,
    TOMATO_APP_CHANNEL_CREATE_SUCCESS,
    TOMATO_APP_CHANNEL_CREATE_FAILED
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import axios from 'axios';
import {BASE_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader, responseChannelMapper, storeData} from '../../common/utils/utilFunctions';
import {IChannelServerModel} from '../../models/IChannelServerModel';

const channelCreateStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_STARTED,
});

const channelCreateFailed = (): Action => ({
    type: TOMATO_APP_CHANNEL_CREATE_FAILED,
});

const channelCreateSuccess = (channel: IChannel): Action => ({
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

interface ICreateChannelFactoryDependencies {
    readonly channelCreateStarted: () => Action;
    readonly channelCreateFailed: () => Action;
    readonly channelCreateSuccess: (channel: IChannel) => Action;
    readonly channelCreate: (authToken: AuthToken, channel: IChannelServerModel) => any;
}

const createChannelCreateFactory = (dependencies: ICreateChannelFactoryDependencies) => (authToken: AuthToken, channel: IChannelServerModel) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.channelCreateStarted());

        return channelCreate(authToken, channel)
            .then((response: any) => {
                const createdChannel: IChannel = responseChannelMapper(response.data);
                storeData('channelId', createdChannel.id);
                dispatch(dependencies.channelCreateSuccess(createdChannel));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.channelCreateFailed());
            });
    };

export const createChannel = createChannelCreateFactory(createChannelCreateFactoryDependencies);
