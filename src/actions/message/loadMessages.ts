import { Dispatch } from 'redux';
import {
    TOMATO_APP_LOADING_MESSAGES_FAILED,
    TOMATO_APP_LOADING_MESSAGES_STARTED,
    TOMATO_APP_LOADING_MESSAGES_SUCCESS,
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';
import axios from 'axios';
import {GET_ALL_MESSAGES_FROM_CHANNEL} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

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
    return axios.get(GET_ALL_MESSAGES_FROM_CHANNEL(channelId), endpointConfigHeader(authToken));
};

const createLoadAllMessagesFactoryDependencies = {
    loadingStarted,
    loadingSuccess,
    loadingFailed,
    loadAllMessages
};

interface ILoadAllMesagesFactoryDependencies {
    readonly loadingStarted: () => Action;
    readonly loadingSuccess: (messages: ReadonlyArray<IMessage>) => Action;
    readonly loadingFailed: () => Action;
    readonly loadAllMessages: (authToken: string | null, channelId: Uuid) => any;
}

const createLoadAllMessagesFactory = (dependencies: ILoadAllMesagesFactoryDependencies) => (authToken: string | null, channelId: Uuid) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());

        return dependencies.loadAllMessages(authToken, channelId)
            .then((response: any) => {
                const messages: IMessage[] = [];
                response.data.forEach((serverData: any) => {
                    messages.push(serverData.customData as IMessage);
                });

                dispatch(dependencies.loadingSuccess(messages));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.loadingFailed());
            });
    };

export const loadMessages = createLoadAllMessagesFactory(createLoadAllMessagesFactoryDependencies);
