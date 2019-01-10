import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    channelHelper,
    expectedLoadingChannelsStarted
} from '../helpers/helpers';
import {
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

describe('Channel create thunk action tests.', () => {
    const expectedDeleteChannelStarted = {type: TOMATO_APP_CHANNEL_DELETE_STARTED};

    const expectedDeleteChannelSuccess = {type: TOMATO_APP_CHANNEL_DELETE_SUCCESS,
        payload: {
            deletedChannelId: channelHelper.id,
        }};

    const channelDelete = (authToken: AuthToken, deletedChannelId: Uuid) => {
        console.log(authToken + deletedChannelId);
        return Promise.resolve({});
    };

    const createTestDeleteDependencies = {
        channelDeleteStarted,
        channelDeleteFailed,
        channelDeleteSuccess,
        channelDelete
    };

    test('Dispatch thunks in correct order: createChannel.', async done => {
        await createChannelDeleteFactory(createTestDeleteDependencies)
            (authTokenHelper, channelHelper.id, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedDeleteChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedDeleteChannelSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedLoadingChannelsStarted);
        done();
    });
});
