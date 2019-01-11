import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    TOMATO_APP_MESSAGE_UPDATE_FAILED,
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
import {errorMessageMessageUpdate} from '../../../constants/errorMessages';

describe('Message update thunk action tests.', () => {
    const expectedUpdateMessageStarted = {type: TOMATO_APP_MESSAGE_UPDATE_STARTED,
        payload: {
            id: messageHelper.id
        }};
    const expectedUpdateMessageSuccess = {type: TOMATO_APP_MESSAGE_UPDATE_SUCCESS,
        payload: {
            message: messageHelper,
        }};
    const expectedUpdateMessageFailed = {type: TOMATO_APP_MESSAGE_UPDATE_FAILED,
        payload: errorMessageMessageUpdate};

    const updateMessageFromChannel = (authToken: AuthToken, channelId: Uuid, messageId: Uuid, message: IMessageServerModel) => {
        return Promise.resolve({data: messageServerModelResponseHelper});
    };

    const updateMessageFromChannelReject = (authToken: AuthToken, channelId: Uuid, messageId: Uuid, message: IMessageServerModel) => {
        return Promise.reject({error: {}});
    };

    const createTestUpdateMessageDependencies = (promise: boolean) => {
        return {
            updateMessageStarted,
            updateMessageSuccess,
            updateMessageFailed,
            updateMessageFromChannel: promise ? updateMessageFromChannel : updateMessageFromChannelReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: updateMessage.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUpdateMessageFactory(createTestUpdateMessageDependencies(resolvedPromise))
            (authTokenHelper, messageHelper, channelIdHelper, messageServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateMessageSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: updateMessage.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUpdateMessageFactory(createTestUpdateMessageDependencies(rejectedPromise))
        (authTokenHelper, messageHelper, channelIdHelper, messageServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateMessageStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateMessageFailed);
        done();
    });
});
