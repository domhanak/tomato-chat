import { Dispatch } from 'redux';
import {
    TOMATO_APP_CHANNEL_DELETE_STARTED,
    TOMATO_APP_CHANNEL_DELETE_SUCCESS,
    TOMATO_APP_CHANNEL_DELETE_FAILED
} from '../../constants/actionTypes';
import axios from 'axios';
import {GET_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

const channelDeleteStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_DELETE_STARTED,
});

const channelDeleteFailed = (): Action => ({
    type: TOMATO_APP_CHANNEL_DELETE_FAILED,
});

const channelDeleteSuccess = (deletedChannelId: Uuid): Action => ({
    type: TOMATO_APP_CHANNEL_DELETE_SUCCESS,
    payload: {
        deletedChannelId,
    }
});

const channelDelete = (authToken: AuthToken, deletedChannelId: Uuid) => {
    return axios.delete(GET_CHANNEL_URI(deletedChannelId), endpointConfigHeader(authToken));
};

const createChannelDeleteFactoryDependencies = {
    channelDeleteStarted,
    channelDeleteFailed,
    channelDeleteSuccess,
    channelDelete
};

interface IDeleteChannelFactoryDependencies {
    readonly channelDeleteStarted: () => Action;
    readonly channelDeleteFailed: () => Action;
    readonly channelDeleteSuccess: (deletedChannelId: Uuid) => Action;
    readonly channelDelete: (authToken: AuthToken, deletedChannelId: Uuid) => any;
}

const createChannelDeleteFactory = (dependencies: IDeleteChannelFactoryDependencies) => (authToken: AuthToken, channelId: Uuid) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.channelDeleteStarted());

        return channelDelete(authToken, channelId)
            .then((_) => {
                dispatch(dependencies.channelDeleteSuccess(channelId));
            })
            .catch((error: any) => {
                console.error(error);
                dispatch(dependencies.channelDeleteFailed());
            });
    };

export const deleteChannel = createChannelDeleteFactory(createChannelDeleteFactoryDependencies);
