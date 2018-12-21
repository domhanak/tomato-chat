import { Dispatch } from 'redux';
import {
    TOMATO_APP_MESSAGE_CREATE_FAILED,
    TOMATO_APP_MESSAGE_CREATE_STARTED,
    TOMATO_APP_MESSAGE_CREATE_SUCCESS
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';
import {BASE_MESSAGE_URI} from '../../constants/apiConstants';
import {endpointConfigHeader, responseMessageMapper} from '../../common/utils/utilFunctions';
import axios from 'axios';
import {IMessageServerModel} from '../../models/IMessageServerModel';

const createMessageStarted = (): Action => ({
    type: TOMATO_APP_MESSAGE_CREATE_STARTED,
});

const createMessageFailed = (): Action => ({
    type: TOMATO_APP_MESSAGE_CREATE_FAILED,
});

const createMessageSuccess = (message: IMessage): Action => ({
    type: TOMATO_APP_MESSAGE_CREATE_SUCCESS,
    payload: {
        message,
    }
});

const messageCreate = (authToken: AuthToken, channelId: Uuid, message: IMessageServerModel) => {
    return axios.post(BASE_MESSAGE_URI(channelId), JSON.stringify(message), endpointConfigHeader(authToken));
};

const createMessageCreateFactoryDependencies = {
    createMessageStarted,
    createMessageFailed,
    createMessageSuccess,
    messageCreate
};

interface ICreateMessageFactoryDependencies {
    readonly createMessageStarted: () => Action;
    readonly createMessageFailed: () => Action;
    readonly createMessageSuccess: (message: IMessage) => Action;
    readonly messageCreate: (authToken: AuthToken, channelId: Uuid, message: IMessageServerModel) => any;
}


const createMessageCreateFactory = (dependencies: ICreateMessageFactoryDependencies) => (authToken: AuthToken, channelId: Uuid, message: IMessageServerModel) =>
    async (dispatch: Dispatch): Promise<IMessage> => {
        dispatch(dependencies.createMessageStarted());

        return dependencies.messageCreate(authToken, channelId, message)
            .then((response: any) => {
                const createdMessage: IMessage = responseMessageMapper(response.data);
                dispatch(dependencies.createMessageSuccess(createdMessage));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.createMessageFailed());
            });
    };

export const createMessage = createMessageCreateFactory(createMessageCreateFactoryDependencies);
