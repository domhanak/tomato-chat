import { Dispatch } from 'redux';
import {
    TOMATO_APP_MESSAGE_EDITING_CANCELLED,
    TOMATO_APP_MESSAGE_EDITING_FAILED,
    TOMATO_APP_MESSAGE_EDITING_STARTED, TOMATO_APP_MESSAGE_EDITING_SUCCESS
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';
import axios from "axios";
import {BASE_MESSAGE_FROM_CHANNEL_URI} from "../../constants/apiConstants";
import {endpointConfigHeader, responseMessageMapper} from "../../common/utils/utilFunctions";
import {IMessageServerModelResponse} from "../../models/IMessageServerModelResponse";
import {IMessageServerModel} from "../../models/IMessageServerModel";

const updateMessageStarted = (id: Uuid): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_STARTED,
    payload: {
        id,
    }
});

const updateMessageFailed = (): Action => ({
    type: TOMATO_APP_MESSAGE_EDITING_FAILED,
});

const updateMessageCancelled = (): Action => ({
    type: TOMATO_APP_MESSAGE_EDITING_CANCELLED,
});

const updateMessageSuccess = (message: IMessage): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_SUCCESS,
  payload: {
      message,
  }
});

const updateMessageFromChannel = (authToken: string | null, channelId: Uuid, messageId: Uuid, message: IMessageServerModel): any => {
    return axios.put(BASE_MESSAGE_FROM_CHANNEL_URI(channelId, messageId), message, endpointConfigHeader(authToken));
};

const createUpdateMessageFactoryDependencies = {
    updateMessageStarted,
    updateMessageSuccess,
    updateMessageFailed,
    updateMessageCancelled,
    updateMessageFromChannel
};

interface IUpdateMessageFactoryDependencies {
    readonly updateMessageStarted: (id: Uuid) => Action;
    readonly updateMessageSuccess: (message: IMessage) => Action;
    readonly updateMessageFailed: () => Action;
    readonly updateMessageCancelled: () => Action;
    readonly updateMessageFromChannel: (authToken: string | null, channelId: Uuid, messageId:Uuid, message: IMessageServerModel) => any;
}

const createUpdateMessageFactory = (dependencies: IUpdateMessageFactoryDependencies) =>
    (authToken: string | null, message: IMessage, channelId: Uuid) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.updateMessageStarted(message.id));

        const serverMessage: IMessageServerModel = {
            value: message.value,
            customData: {},
        };

        return dependencies.updateMessageFromChannel(authToken, channelId, message.id, serverMessage)
            .then((response: any) => {
                const message: IMessageServerModelResponse = response.data.message;

                dispatch(dependencies.updateMessageSuccess(responseMessageMapper(message)));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.updateMessageFailed());
            })
    };


export const updateMessage = createUpdateMessageFactory(createUpdateMessageFactoryDependencies);

