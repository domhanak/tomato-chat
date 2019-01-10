import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    TOMATO_APP_MESSAGE_CREATE_FAILED,
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
import {errorMessageMessageCreate} from '../../../constants/errorMessages';

describe('Message create thunk action tests.', () => {
    const expectedCreateMessageStarted = {type: TOMATO_APP_MESSAGE_CREATE_STARTED};
    const expectedCreateMessageSuccess = {type: TOMATO_APP_MESSAGE_CREATE_SUCCESS,
        payload: {
            message: messageHelper,
        }};

    const expectedCreateMessageFailed = {type: TOMATO_APP_MESSAGE_CREATE_FAILED,
        payload: errorMessageMessageCreate};

    const messageCreate = (authToken: AuthToken, channelId: Uuid, message: IMessageServerModel) => {
        return Promise.resolve({data: messageServerModelResponseHelper});
    };

    const messageCreateReject = (authToken: AuthToken, channelId: Uuid, message: IMessageServerModel) => {
        return Promise.reject({error: {}});
    };

    const createTestCreateMessageDependencies = (promise: boolean) => {
        return {
            createMessageStarted,
            createMessageSuccess,
            createMessageFailed,
            messageCreate: promise ? messageCreate : messageCreateReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: createMessage.', async done => {
        const dispatch = jest.fn((action) => action);
        await createMessageCreateFactory(createTestCreateMessageDependencies(resolvedPromise))
            (authTokenHelper, channelIdHelper, messageServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateMessageSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: createMessage.', async done => {
        const dispatch = jest.fn((action) => action);
        await createMessageCreateFactory(createTestCreateMessageDependencies(rejectedPromise))
        (authTokenHelper, channelIdHelper, messageServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateMessageFailed);
        done();
    });
});
