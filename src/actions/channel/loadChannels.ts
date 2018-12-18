import { Dispatch } from 'redux';
import {
    TOMATO_APP_LOADING_CHANNELS_FAILED,
    TOMATO_APP_LOADING_CHANNELS_STARTED, TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import axios from 'axios';
import {BASE_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader, responseChannelMapper} from '../../common/utils/utilFunctions';
import {IChannelServerModelResponse} from '../../models/IChannelServerModelResponse';

const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_CHANNELS_STARTED,
});

const loadingFailed = (): Action => ({
    type: TOMATO_APP_LOADING_CHANNELS_FAILED,
});

const loadingSuccess = (channels: ReadonlyArray<IChannel>): Action => ({
    type: TOMATO_APP_LOADING_CHANNELS_SUCCESS,
    payload: {
        channels,
    }
});

const loadAllChannels = (authToken: string | null) => {
    return axios.get(BASE_CHANNEL_URI, endpointConfigHeader(authToken));
};

const createLoadAllChannelsFactoryDependencies = {
    loadingStarted,
    loadingSuccess,
    loadingFailed,
    loadAllChannels
};

interface ILoadAllChannelFactoryDependencies {
    readonly loadingStarted: () => Action;
    readonly loadingSuccess: (channels: ReadonlyArray<IChannel>) => Action;
    readonly loadingFailed: () => Action;
    readonly loadAllChannels: (authToken: AuthToken) => any;
}

const createLoadAllChannelFactory = (dependencies: ILoadAllChannelFactoryDependencies) => (authToken: AuthToken) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());

        return dependencies.loadAllChannels(authToken)
            .then((response: any) => {
                const channels: IChannel[] = [];
                response.data.forEach((serverData: IChannelServerModelResponse) => {
                    const channel: IChannel = responseChannelMapper(serverData);
                    channels.push(channel);
                });

                dispatch(dependencies.loadingSuccess(channels));
            })
            .catch((error: any) => {
               console.log(error);
               dispatch(dependencies.loadingFailed());
            });
    };

export const loadChannels = createLoadAllChannelFactory(createLoadAllChannelsFactoryDependencies);
