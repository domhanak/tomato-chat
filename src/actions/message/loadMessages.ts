import { Dispatch } from 'redux';
import {
    TOMATO_APP_LOADING_MESSAGES_FAILED,
    TOMATO_APP_LOADING_MESSAGES_STARTED,
    TOMATO_APP_LOADING_MESSAGES_SUCCESS,
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';
import axios from 'axios';
import {BASE_MESSAGE_URI} from '../../constants/apiConstants';
import {endpointConfigHeader, responseMessageMapper} from '../../common/utils/utilFunctions';
import {IMessageServerModelResponse} from '../../models/IMessageServerModelResponse';

const loadingFailed = (): Action => ({
    type: TOMATO_APP_LOADING_MESSAGES_FAILED,
});

const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_MESSAGES_STARTED,
});

const loadingSuccess = (messages: ReadonlyArray<IMessage>): Action => ({
    type: TOMATO_APP_LOADING_MESSAGES_SUCCESS,
    payload: {
        messages,
    }
});

const loadAllMessages = (authToken: string | null, channelId: Uuid) => {
    return axios.get(BASE_MESSAGE_URI(channelId), endpointConfigHeader(authToken));
};

const createLoadAllMessagesFactoryDependencies = {
    loadingStarted,
    loadingSuccess,
    loadingFailed,
    loadAllMessages
};

interface ILoadAllMessagesFactoryDependencies {
    readonly loadingStarted: () => Action;
    readonly loadingSuccess: (messages: ReadonlyArray<IMessage>) => Action;
    readonly loadingFailed: () => Action;
    readonly loadAllMessages: (authToken: string | null, channelId: Uuid) => any;
}

const createLoadAllMessagesFactory = (dependencies: ILoadAllMessagesFactoryDependencies) => (authToken: string | null, channelId: Uuid) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());

        return dependencies.loadAllMessages(authToken, channelId)
            .then((response: any) => {
                const messages: IMessage[] = [];
                response.data
                    .sort((
                        msg1: IMessageServerModelResponse, msg2: IMessageServerModelResponse) => (msg1.createdAt > msg2.createdAt)
                    ).forEach((serverData: IMessageServerModelResponse) => {
                        messages.push(responseMessageMapper(serverData));
                    });

                dispatch(dependencies.loadingSuccess(messages));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.loadingFailed());
            });
    };

export const loadMessages = createLoadAllMessagesFactory(createLoadAllMessagesFactoryDependencies);
