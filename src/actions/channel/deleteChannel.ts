import { Dispatch } from 'redux';
import {
    TOMATO_APP_CHANNEL_DELETE_STARTED,
    TOMATO_APP_CHANNEL_DELETE_SUCCESS,
    TOMATO_APP_CHANNEL_DELETE_FAILED
} from '../../constants/actionTypes';
import axios from 'axios';
import {GET_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {loadChannels} from './loadChannels';
import {IUserServerModel} from '../../models/IUserServerModel';
import {updateUser} from '../users/updateUser';
import * as Immutable from 'immutable';
import {errorMessageChannelDelete} from '../../constants/errorMessages';

export const channelDeleteStarted = (): Action => ({
    type: TOMATO_APP_CHANNEL_DELETE_STARTED,
});

export const channelDeleteFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_CHANNEL_DELETE_FAILED,
    payload: errorMessage
});

export const channelDeleteSuccess = (deletedChannelId: Uuid): Action => ({
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
    readonly channelDeleteFailed: (errorMessage: string | null) => Action;
    readonly channelDeleteSuccess: (deletedChannelId: Uuid) => Action;
    readonly channelDelete: (authToken: AuthToken, deletedChannelId: Uuid) => any;
}

export const createChannelDeleteFactory = (dependencies: IDeleteChannelFactoryDependencies) => (authToken: AuthToken, channelId: Uuid, user: IUserServerModel) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.channelDeleteStarted());

        return dependencies.channelDelete(authToken, channelId)
            .then((_: any) => {
                dispatch(dependencies.channelDeleteSuccess(channelId));
                const channels: Immutable.List<Uuid> = Immutable.List(user.customData.channels).filter((value: Uuid) => { return value !== channelId; }).toList();
                updateUser(authToken, {email: user.email, customData: {...user.customData,
                        channels}})(dispatch);

                loadChannels(authToken)(dispatch);
            })
            .catch((error: any) => {
                console.error(error);
                dispatch(dependencies.channelDeleteFailed(errorMessageChannelDelete));
            });
    };

export const deleteChannel = createChannelDeleteFactory(createChannelDeleteFactoryDependencies);
