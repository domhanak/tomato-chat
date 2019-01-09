import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    TOMATO_APP_MESSAGE_UPDATE_STARTED,
    TOMATO_APP_MESSAGE_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    channelIdHelper,
    messageHelper,
    messageServerModelHelper,
    messageServerModelResponseHelper
} from '../helpers/helpers';
import {
    createUpdateMessageFactory,
    updateMessageFailed, updateMessageStarted,
    updateMessageSuccess
} from '../../../actions/message/updateMessage';
import {IMessageServerModel} from '../../../models/IMessageServerModel';

describe('Message update thunk action tests.', () => {
    const expectedUpdateMessageStarted = {type: TOMATO_APP_MESSAGE_UPDATE_STARTED,
        payload: {
            id: messageHelper.id
        }};
    const expectedUpdateMessageSuccess = {type: TOMATO_APP_MESSAGE_UPDATE_SUCCESS,
        payload: {
            message: messageHelper,
        }};

    const updateMessageFromChannel = (authToken: AuthToken, channelId: Uuid, messageId: Uuid, message: IMessageServerModel) => {
        console.log(authToken + channelId + messageId, + message.value);
        return Promise.resolve({data: messageServerModelResponseHelper});
    };

    const createTestUpdateMessageDependencies = {
        updateMessageStarted,
        updateMessageSuccess,
        updateMessageFailed,
        updateMessageFromChannel
    };

    test('Dispatch thunks in correct order: updateMessage.', async done => {
        await createUpdateMessageFactory(createTestUpdateMessageDependencies)
            (authTokenHelper, messageHelper, channelIdHelper, messageServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateMessageSuccess);
        done();
    });
});
