import { Dispatch } from 'redux';
import {
    TOMATO_APP_LOADING_CHANNELS_FAILED,
    TOMATO_APP_LOADING_CHANNELS_STARTED, TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import axios from 'axios';
import {GET_ALL_CHANNELS_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

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
    return axios.get(GET_ALL_CHANNELS_URI, endpointConfigHeader(authToken));
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
    readonly loadAllChannels: (authToken: string | null) => any;
}

const createLoadAllChannelFactory = (dependencies: ILoadAllChannelFactoryDependencies) => (authToken: string | null) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());

        return dependencies.loadAllChannels(authToken)
            .then((response: any) => {
                const channels: IChannel[] = [];
                response.data.forEach((serverData: any) => {
                   channels.push(serverData.customData as IChannel);
                });

                dispatch(dependencies.loadingSuccess(channels));
            })
            .catch((error: any) => {
               console.log(error);
               dispatch(dependencies.loadingFailed());
            });
    };

export const loadChannels = createLoadAllChannelFactory(createLoadAllChannelsFactoryDependencies);
