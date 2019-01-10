import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    TOMATO_APP_MESSAGE_DELETE_STARTED, TOMATO_APP_MESSAGE_DELETE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    createMessageDeleteFactory,
    messageDeleteFailed,
    messageDeleteStarted,
    messageDeleteSuccess
} from '../../../actions/message/deleteMessage';
import {channelIdHelper, deletedMessageIdHelper} from '../helpers/helpers';

describe('Message delete thunk action tests.', () => {
    const expectedDeleteMessageStarted = {type: TOMATO_APP_MESSAGE_DELETE_STARTED};

    const expectedDeleteMessageSuccess = {type: TOMATO_APP_MESSAGE_DELETE_SUCCESS,
        payload: {
            deletedMessageId: deletedMessageIdHelper,
        }};

    const messageDelete = (authToken: AuthToken, deletedMessageId: Uuid, channelId: Uuid) => {
        return Promise.resolve({});
    };

    const createTestDeleteMessageDependencies = {
        messageDeleteStarted,
        messageDeleteFailed,
        messageDeleteSuccess,
        messageDelete
    };

    test('Dispatch thunks in correct order: deleteMessage.', async done => {
        await createMessageDeleteFactory(createTestDeleteMessageDependencies)
            (authTokenHelper, deletedMessageIdHelper, channelIdHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedDeleteMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedDeleteMessageSuccess);
        done();
    });
});
