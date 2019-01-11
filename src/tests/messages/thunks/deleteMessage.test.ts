import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    TOMATO_APP_MESSAGE_DELETE_FAILED,
    TOMATO_APP_MESSAGE_DELETE_STARTED, TOMATO_APP_MESSAGE_DELETE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    createMessageDeleteFactory,
    messageDeleteFailed,
    messageDeleteStarted,
    messageDeleteSuccess
} from '../../../actions/message/deleteMessage';
import {channelIdHelper, deletedMessageIdHelper} from '../helpers/helpers';
import {errorMessageMessageDelete} from '../../../constants/errorMessages';

describe('Message delete thunk action tests.', () => {
    const expectedDeleteMessageStarted = {type: TOMATO_APP_MESSAGE_DELETE_STARTED};

    const expectedDeleteMessageSuccess = {type: TOMATO_APP_MESSAGE_DELETE_SUCCESS,
        payload: {
            deletedMessageId: deletedMessageIdHelper,
        }};

    const expectedDeleteMessageFailed = {type: TOMATO_APP_MESSAGE_DELETE_FAILED,
        payload: errorMessageMessageDelete};

    const messageDelete = (authToken: AuthToken, deletedMessageId: Uuid, channelId: Uuid) => {
        return Promise.resolve({});
    };

    const messageDeleteReject = (authToken: AuthToken, deletedMessageId: Uuid, channelId: Uuid) => {
        return Promise.reject({error: {}});
    };

    const createTestDeleteMessageDependencies = (promise: boolean) => {
        return {
            messageDeleteStarted,
            messageDeleteFailed,
            messageDeleteSuccess,
            messageDelete: promise ? messageDelete : messageDeleteReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: deleteMessage.', async done => {
        const dispatch = jest.fn((action) => action);
        await createMessageDeleteFactory(createTestDeleteMessageDependencies(resolvedPromise))
            (authTokenHelper, deletedMessageIdHelper, channelIdHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedDeleteMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedDeleteMessageSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: deleteMessage.', async done => {
        const dispatch = jest.fn((action) => action);
        await createMessageDeleteFactory(createTestDeleteMessageDependencies(rejectedPromise))
        (authTokenHelper, deletedMessageIdHelper, channelIdHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedDeleteMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedDeleteMessageFailed);
        done();
    });
});
