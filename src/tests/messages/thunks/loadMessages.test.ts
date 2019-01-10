import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    TOMATO_APP_LOADING_MESSAGES_STARTED, TOMATO_APP_LOADING_MESSAGES_SUCCESS,
} from '../../../constants/actionTypes';
import {channelIdHelper, messageHelper, messageServerModelResponseHelper} from '../helpers/helpers';
import {
    createLoadAllMessagesFactory,
    loadingFailed,
    loadingStarted,
    loadingSuccess
} from '../../../actions/message/loadMessages';

describe('Message load thunk action tests.', () => {
    const expectedloadMessagesStarted = {type: TOMATO_APP_LOADING_MESSAGES_STARTED};
    const expectedloadMessagesSuccess = {type: TOMATO_APP_LOADING_MESSAGES_SUCCESS,
        payload: {
            messages: [messageHelper],
        }};

    const loadAllMessages = (authToken: AuthToken, channelId: Uuid) => {
        return Promise.resolve({data: [messageServerModelResponseHelper]});
    };

    const createTestLoadMessagesDependencies = {
        loadingStarted,
        loadingSuccess,
        loadingFailed,
        loadAllMessages
    };

    test('Dispatch thunks in correct order: loadMessages.', async done => {
        await createLoadAllMessagesFactory(createTestLoadMessagesDependencies)
            (authTokenHelper, channelIdHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedloadMessagesStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedloadMessagesSuccess);
        done();
    });
});
