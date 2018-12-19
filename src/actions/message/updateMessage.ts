import { Dispatch } from 'redux';
import {
    TOMATO_APP_MESSAGE_EDITING_CANCELLED,
    TOMATO_APP_MESSAGE_EDITING_FAILED,
    TOMATO_APP_MESSAGE_EDITING_STARTED, TOMATO_APP_MESSAGE_EDITING_SUCCESS
} from '../../constants/actionTypes';
import {IMessage} from '../../models/IMessage';
import axios from "axios";
import {BASE_MESSAGE_FROM_CHANNEL_URI} from "../../constants/apiConstants";
import {requestBody} from "../../common/utils/utilFunctions";

const updateMessageStarted = (): Action => ({
  type: TOMATO_APP_MESSAGE_EDITING_STARTED,
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

const updateMessageFromChannel = (authToken: string | null, channelId: Uuid, messageId: Uuid, text: string):any => {
    return axios.put(BASE_MESSAGE_FROM_CHANNEL_URI(channelId, messageId), requestBody(authToken, text));
};

const createUpdateMessageFactoryDependencies = {
    updateMessageStarted,
    updateMessageSuccess,
    updateMessageFailed,
    updateMessageCancelled,
    updateMessageFromChannel
};

interface IUpdateMessageFactoryDependencies {
    readonly updateMessageStarted: () => Action;
    readonly updateMessageSuccess: (message: IMessage) => Action;
    readonly updateMessageFailed: () => Action;
    readonly updateMessageCancelled: () => Action;
    readonly updateMessageFromChannel: (authToken: string | null, messageId: Uuid, channelId: Uuid, text: string) => any;
}

const createUpdateMessageFactory = (dependencies: IUpdateMessageFactoryDependencies) => (authToken: string | null, messageId: Uuid, channelId: Uuid, text: string) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.updateMessageStarted());

        return dependencies.updateMessageFromChannel(authToken, channelId, messageId, text)
            .then((response: any) => {
                const message: IMessage = response.data.message;

                dispatch(dependencies.updateMessageSuccess(message));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.updateMessageFailed());
            })
    };


export const updateMessage = createUpdateMessageFactory(createUpdateMessageFactoryDependencies);

