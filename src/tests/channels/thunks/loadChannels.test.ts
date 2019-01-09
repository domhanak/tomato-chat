import {
    TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from '../../../constants/actionTypes';
import {
    authTokenHelper,
    channelHelper,
    channelServerModelResponse,
    dispatch,
    expectedLoadingChannelsStarted
} from '../helpers/helpers';
import {
    createLoadAllChannelFactory,
    loadingFailed,
    loadingStarted,
    loadingSuccess
} from '../../../actions/channel/loadChannels';

describe('Load channels thunk tests.', () => {
    const expectedLoadChannelsSuccess = {type: TOMATO_APP_LOADING_CHANNELS_SUCCESS,
        payload: {
            channels: [channelHelper],
        }};

    const loadAllChannels = (authToken: AuthToken) => {
        console.log(authToken);
        return Promise.resolve({data: [channelServerModelResponse]});
    };

    const createTestLoadChannelsDependencies = {
        loadingStarted,
        loadingSuccess,
        loadingFailed,
        loadAllChannels
    };

    test('Dispatch thunks in correct order: loadChannels.', async done => {
        await createLoadAllChannelFactory(createTestLoadChannelsDependencies)(authTokenHelper)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedLoadingChannelsStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoadChannelsSuccess);
        done();
    });
});
