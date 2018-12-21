import { Dispatch } from 'redux';
import {
    TOMATO_APP_MESSAGE_UPDATE_FAILED,
    TOMATO_APP_MESSAGE_UPDATE_STARTED,
    TOMATO_APP_MESSAGE_UPDATE_SUCCESS
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';
import axios from "axios";
import {BASE_MESSAGE_FROM_CHANNEL_URI} from "../../constants/apiConstants";
import {endpointConfigHeader, responseMessageMapper} from "../../common/utils/utilFunctions";
import {IMessageServerModelResponse} from "../../models/IMessageServerModelResponse";
import {IMessageServerModel} from "../../models/IMessageServerModel";

const updateMessageStarted = (id: Uuid): Action => ({
    type: TOMATO_APP_MESSAGE_UPDATE_STARTED,
    payload: {
        id
    }
});

const updateMessageFailed = (): Action => ({
    type: TOMATO_APP_MESSAGE_UPDATE_FAILED,
});

const updateMessageSuccess = (message: IMessage): Action => ({
  type: TOMATO_APP_MESSAGE_UPDATE_SUCCESS,
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
    updateMessageFromChannel
};

interface IUpdateMessageFactoryDependencies {
    readonly updateMessageStarted: (id: Uuid) => Action;
    readonly updateMessageSuccess: (message: IMessage) => Action;
    readonly updateMessageFailed: () => Action;
    readonly updateMessageFromChannel: (authToken: string | null, channelId: Uuid, messageId:Uuid, message: IMessageServerModel) => any;
}

const createUpdateMessageFactory = (dependencies: IUpdateMessageFactoryDependencies): any =>
    (authToken: string | null, message: IMessage, channelId: Uuid, newValue: string): any =>
        async (dispatch: Dispatch): Promise<IMessage> => {
            dispatch(dependencies.updateMessageStarted(message.id));

            const serverMessage: IMessageServerModel = {
                value: newValue,
                customData: {},
            };

            return dependencies.updateMessageFromChannel(authToken, channelId, message.id, serverMessage)
                .then((response: any) => {
                    const message: IMessageServerModelResponse = response.data as IMessageServerModelResponse;
                    dispatch(dependencies.updateMessageSuccess(responseMessageMapper(message)));
                })
                .catch((error: any) => {
                    console.log(error);
                    dispatch(dependencies.updateMessageFailed());
                })
        };


export const updateMessage = createUpdateMessageFactory(createUpdateMessageFactoryDependencies);

