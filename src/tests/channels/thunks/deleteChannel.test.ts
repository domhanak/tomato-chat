import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    channelHelper,
    expectedLoadingChannelsStarted
} from '../helpers/helpers';
import {
    TOMATO_APP_CHANNEL_DELETE_FAILED,
    TOMATO_APP_CHANNEL_DELETE_STARTED,
    TOMATO_APP_CHANNEL_DELETE_SUCCESS,
} from '../../../constants/actionTypes';
import {expectedUserChannelStarted, userServerModelHelper} from '../../users/helpers/helpers';
import {
    channelDeleteFailed,
    channelDeleteStarted,
    channelDeleteSuccess,
    createChannelDeleteFactory
} from '../../../actions/channel/deleteChannel';
import {errorMessageChannelDelete} from '../../../constants/errorMessages';

describe('Channel delete thunk action tests.', () => {
    const expectedDeleteChannelStarted = {type: TOMATO_APP_CHANNEL_DELETE_STARTED};

    const expectedDeleteChannelSuccess = {type: TOMATO_APP_CHANNEL_DELETE_SUCCESS,
        payload: {
            deletedChannelId: channelHelper.id,
        }};

    const expectedDeleteChannelFailed = {type: TOMATO_APP_CHANNEL_DELETE_FAILED,
        payload: errorMessageChannelDelete};

    const channelDelete = (authToken: AuthToken, deletedChannelId: Uuid) => {
        return Promise.resolve({});
    };

    const channelDeleteRejected = (authToken: AuthToken, deletedChannelId: Uuid) => {
        return Promise.reject({error: {}});
    };

    const createTestDeleteDependencies = (promise: boolean) => {
        return {
            channelDeleteStarted,
            channelDeleteFailed,
            channelDeleteSuccess,
            channelDelete: promise ? channelDelete : channelDeleteRejected,
        };
    };

    test('Dispatch thunks in correct order, resolved: deleteChannel.', async done => {
        const dispatch = jest.fn((action) => action);
        await createChannelDeleteFactory(createTestDeleteDependencies(resolvedPromise))
            (authTokenHelper, channelHelper.id, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedDeleteChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedDeleteChannelSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedLoadingChannelsStarted);
        done();
    });

    test('Dispatch thunks in correct order, rejected: deleteChannel.', async done => {
        const dispatch = jest.fn((action) => action);
        await createChannelDeleteFactory(createTestDeleteDependencies(rejectedPromise))
        (authTokenHelper, channelHelper.id, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedDeleteChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedDeleteChannelFailed);
        done();
    });
});
