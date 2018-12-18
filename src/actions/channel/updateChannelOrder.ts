import {TOMATO_APP_CHANNEL_ORDER_CHANGED,
    TOMATO_APP_CHANNEL_ORDER_STARTED,
    TOMATO_APP_CHANNEL_ORDER_FAILED} from '../../constants/actionTypes';
import {IChannel} from '../../models/IChannel';
import {Dispatch} from 'redux';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {updateChannelApiCall} from './updateChannelApiCall';
import {responseChannelMapper} from '../../common/utils/utilFunctions';

const updateChannelOrderStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_ORDER_STARTED,
});

const updateChannelOrderFailed = (): Action => ({
    type: TOMATO_APP_CHANNEL_ORDER_FAILED,
});

const updateChannelOrderSuccess = (channel: IChannel, neighbour: IChannel): Action => ({
    type: TOMATO_APP_CHANNEL_ORDER_CHANGED,
    payload: {
        channel,
        neighbour,
    }
});

const createUpdateOrderChannelFactoryDependencies = {
    updateChannelOrderStarted,
    updateChannelOrderSuccess,
    updateChannelOrderFailed,
    updateChannelApiCall
};

interface IUpdateChannelOrderFactoryDependencies {
    readonly updateChannelOrderStarted: () => Action;
    readonly updateChannelOrderSuccess: (channel: IChannel, neighbour: IChannel) => Action;
    readonly updateChannelOrderFailed: () => Action;
    readonly updateChannelApiCall: (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => any;
}

const createUpdateChannelOrderFactory = (dependencies: IUpdateChannelOrderFactoryDependencies) =>
    (authToken: AuthToken,
     channelId: Uuid, channel: IChannelServerModel,
     neighbourId: Uuid, neighbour: IChannelServerModel) =>
        (dispatch: Dispatch): any => {

    dispatch(dependencies.updateChannelOrderStarted());

    return dependencies.updateChannelApiCall(authToken, channel, channelId)
        .then((response: any) => {
            const channelResponse: IChannel = responseChannelMapper(response.data);

            return dependencies.updateChannelApiCall(authToken, neighbour, neighbourId)
                .then((responseApiNeighbour: any) => {
                    const neighbourResponse: IChannel = responseChannelMapper(responseApiNeighbour.data);
                    dispatch(dependencies.updateChannelOrderSuccess(channelResponse, neighbourResponse));
                })
                .catch((error: any) => {
                    console.log(error);
                    dispatch(dependencies.updateChannelOrderFailed());
                });
        })
        .catch((error: any) => {
            console.log(error);
            dispatch(dependencies.updateChannelOrderFailed());
        });
};

export const updateChannelOrder = createUpdateChannelOrderFactory(createUpdateOrderChannelFactoryDependencies);
