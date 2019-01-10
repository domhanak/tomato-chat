import { Dispatch } from 'redux';
import {
    TOMATO_APP_MESSAGE_DELETE_STARTED,
    TOMATO_APP_MESSAGE_DELETE_SUCCESS,
    TOMATO_APP_MESSAGE_DELETE_FAILED
} from '../../constants/actionTypes';
import axios from 'axios';
import {BASE_MESSAGE_FROM_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {errorMessageMessageDelete} from '../../constants/errorMessages';

export const messageDeleteStarted = (): Action => ({
    type: TOMATO_APP_MESSAGE_DELETE_STARTED,
});

export const messageDeleteFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_MESSAGE_DELETE_FAILED,
    payload: errorMessage
});

export const messageDeleteSuccess = (deletedMessageId: Uuid): Action => ({
    type: TOMATO_APP_MESSAGE_DELETE_SUCCESS,
    payload: {
        deletedMessageId,
    }
});

const messageDelete = (authToken: AuthToken, deletedMessageId: Uuid, channelId: Uuid) => {
    return axios.delete(BASE_MESSAGE_FROM_CHANNEL_URI(channelId, deletedMessageId), endpointConfigHeader(authToken));
};

const createMessageDeleteFactoryDependencies = {
    messageDeleteStarted,
    messageDeleteFailed,
    messageDeleteSuccess,
    messageDelete
};

interface IDeleteMessageFactoryDependencies {
    readonly messageDeleteStarted: () => Action;
    readonly messageDeleteFailed: (errorMessage: string | null) => Action;
    readonly messageDeleteSuccess: (deleteMessageId: Uuid) => Action;
    readonly messageDelete: (authToken: AuthToken, deletedMessageId: Uuid, channelId: Uuid) => any;
}

export const createMessageDeleteFactory = (dependencies: IDeleteMessageFactoryDependencies) => (authToken: AuthToken, messageId: Uuid, channelId: Uuid) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.messageDeleteStarted());

        return dependencies.messageDelete(authToken, messageId, channelId)
            .then((_: any) => {
                dispatch(dependencies.messageDeleteSuccess(messageId));
            })
            .catch((error: any) => {
                console.error(error);
                dispatch(dependencies.messageDeleteFailed(errorMessageMessageDelete));
            });
    };

export const deleteMessage = createMessageDeleteFactory(createMessageDeleteFactoryDependencies);
