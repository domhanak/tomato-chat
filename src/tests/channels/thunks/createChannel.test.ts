import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    channelHelper,
    channelServerModel,
    channelServerModelResponse,
} from '../helpers/helpers';
import {
    TOMATO_APP_CHANNEL_CREATE_FAILED,
    TOMATO_APP_CHANNEL_CREATE_STARTED,
    TOMATO_APP_CHANNEL_CREATE_SUCCESS,
} from '../../../constants/actionTypes';
import {channelCreateFailed,
        channelCreateStarted,
        channelCreateSuccess,
        createChannelCreateFactory
} from '../../../actions/channel/createChannel';
import {expectedUserChannelStarted, userServerModelHelper} from '../../users/helpers/helpers';
import {errorMessageChannelCreate} from '../../../constants/errorMessages';

describe('Channel create thunk action tests.', () => {
    const expectedCreateChannelStarted = {type: TOMATO_APP_CHANNEL_CREATE_STARTED};

    const expectedCreateChannelSuccess = {type: TOMATO_APP_CHANNEL_CREATE_SUCCESS,
        payload: {
            channel: channelHelper,
        }};

    const expectedCreateChannelFailed = {type: TOMATO_APP_CHANNEL_CREATE_FAILED,
        payload: errorMessageChannelCreate};

    const channelCreate = (authToken: AuthToken, channel: IChannelServerModel) => {
        return Promise.resolve({data: channelServerModelResponse});
    };

    const channelCreateRejected = (authToken: AuthToken, channel: IChannelServerModel) => {
        return Promise.reject({error: {}});
    };

    const createTestCreateDependencies = (promise: boolean) => {
        return {
            channelCreateStarted,
            channelCreateFailed,
            channelCreateSuccess,
            channelCreate: promise ? channelCreate : channelCreateRejected,
        };
    };

    test('Dispatch thunks in correct order, resolved: createChannel.', async done => {
        const dispatch = jest.fn((action) => action);
        await createChannelCreateFactory(createTestCreateDependencies(resolvedPromise))
            (authTokenHelper, channelServerModel, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateChannelSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserChannelStarted);
        done();
    });

    test('Dispatch thunks in correct order, rejected: createChannel.', async done => {
        const dispatch = jest.fn((action) => action);
        await createChannelCreateFactory(createTestCreateDependencies(rejectedPromise))
            (authTokenHelper, channelServerModel, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateChannelFailed);
        done();
    });
});
