import { Dispatch } from 'redux';
import {
    TOMATO_APP_CHANNEL_EDITING_STARTED,
    TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    TOMATO_APP_CHANNEL_EDITING_FAILED
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {IChannelServerModelResponse} from '../../models/IChannelServerModelResponse';
import {endpointConfigHeader, responseChannelMapper} from '../../common/utils/utilFunctions';
import axios from 'axios';
import {GET_CHANNEL_URI} from '../../constants/apiConstants';

export const updateChannelStarted = (id: Uuid): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_STARTED,
    payload: {
        id,
    }
});

export const updateChannelFailed = (): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_FAILED,
});

export const updateChannelSuccess = (channel: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    payload: {
        channel,
    }
});

const updateChannelApiCall = (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => {
    return axios.put(GET_CHANNEL_URI(channelId), channel, endpointConfigHeader(authToken));
};

const createUpdateChannelFactoryDependencies = {
    updateChannelStarted,
    updateChannelSuccess,
    updateChannelFailed,
    updateChannelApiCall
};

export interface IUpdateChannelFactoryDependencies {
    readonly updateChannelStarted: (id: Uuid) => Action;
    readonly updateChannelSuccess: (channel: IChannel) => Action;
    readonly updateChannelFailed: () => Action;
    readonly updateChannelApiCall: (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => any;
}

export const createUpdateChannelFactory = (dependencies: IUpdateChannelFactoryDependencies) =>
    (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) =>
    (dispatch: Dispatch): any => {
    dispatch(dependencies.updateChannelStarted(channelId));

    return dependencies.updateChannelApiCall(authToken, channel, channelId)
        .then((response: any) => {
            const channelResponse: IChannelServerModelResponse = response.data;
            dispatch(dependencies.updateChannelSuccess(responseChannelMapper(channelResponse)));
        })
        .catch((error: any) => {
            console.log(error);
            dispatch(dependencies.updateChannelFailed());
        });
};

export const updateChannel = createUpdateChannelFactory(createUpdateChannelFactoryDependencies);
