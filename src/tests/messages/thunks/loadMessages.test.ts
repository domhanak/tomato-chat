import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    TOMATO_APP_LOADING_MESSAGES_FAILED,
    TOMATO_APP_LOADING_MESSAGES_STARTED, TOMATO_APP_LOADING_MESSAGES_SUCCESS,
} from '../../../constants/actionTypes';
import {channelIdHelper, messageHelper, messageServerModelResponseHelper} from '../helpers/helpers';
import {
    createLoadAllMessagesFactory,
    loadingFailed,
    loadingStarted,
    loadingSuccess
} from '../../../actions/message/loadMessages';
import {errorMessageLoadingMessages} from '../../../constants/errorMessages';

describe('Message load thunk action tests.', () => {
    const expectedloadMessagesStarted = {type: TOMATO_APP_LOADING_MESSAGES_STARTED};
    const expectedloadMessagesSuccess = {type: TOMATO_APP_LOADING_MESSAGES_SUCCESS,
        payload: {
            messages: [messageHelper],
        }};

    const expectedLoadMessagesFailed = {type: TOMATO_APP_LOADING_MESSAGES_FAILED,
        payload: errorMessageLoadingMessages};

    const loadAllMessages = (authToken: AuthToken, channelId: Uuid) => {
        return Promise.resolve({data: [messageServerModelResponseHelper]});
    };

    const loadAllMessagesReject = (authToken: AuthToken, channelId: Uuid) => {
        return Promise.reject({error: {}});
    };

    const createTestLoadMessagesDependencies = (promise: boolean) => {
        return {
            loadingStarted,
            loadingSuccess,
            loadingFailed,
            loadAllMessages: promise ? loadAllMessages : loadAllMessagesReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: loadMessages.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllMessagesFactory(createTestLoadMessagesDependencies(resolvedPromise))
            (authTokenHelper, channelIdHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedloadMessagesStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedloadMessagesSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: loadMessages.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllMessagesFactory(createTestLoadMessagesDependencies(rejectedPromise))
        (authTokenHelper, channelIdHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedloadMessagesStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoadMessagesFailed);
        done();
    });
});
