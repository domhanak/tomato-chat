import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    TOMATO_APP_MESSAGE_CREATE_STARTED, TOMATO_APP_MESSAGE_CREATE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    channelIdHelper,
    messageHelper,
    messageServerModelHelper,
    messageServerModelResponseHelper
} from '../helpers/helpers';
import {IMessageServerModel} from '../../../models/IMessageServerModel';
import {
    createMessageCreateFactory,
    createMessageFailed,
    createMessageStarted, createMessageSuccess
} from '../../../actions/message/createMessage';

describe('Message create thunk action tests.', () => {
    const expectedCreateMessageStarted = {type: TOMATO_APP_MESSAGE_CREATE_STARTED};
    const expectedCreateMessageSuccess = {type: TOMATO_APP_MESSAGE_CREATE_SUCCESS,
        payload: {
            message: messageHelper,
        }};

    const messageCreate = (authToken: AuthToken, channelId: Uuid, message: IMessageServerModel) => {
        console.log(authToken + channelId + message.value);
        return Promise.resolve({data: messageServerModelResponseHelper});
    };

    const createTestCreateMessageDependencies = {
        createMessageStarted,
        createMessageSuccess,
        createMessageFailed,
        messageCreate
    };

    test('Dispatch thunks in correct order: createMessage.', async done => {
        await createMessageCreateFactory(createTestCreateMessageDependencies)
            (authTokenHelper, channelIdHelper, messageServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateMessageSuccess);
        done();
    });
});
