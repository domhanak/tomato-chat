import {
    TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from '../../../constants/actionTypes';
import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    channelHelper,
    expectedLoadingChannelsStarted, loadAllChannelsTest
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



    const createTestLoadChannelsDependencies = {
        loadingStarted,
        loadingSuccess,
        loadingFailed,
        loadAllChannels: loadAllChannelsTest
    };

    test('Dispatch thunks in correct order: loadChannels.', async done => {
        await createLoadAllChannelFactory(createTestLoadChannelsDependencies)(authTokenHelper)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedLoadingChannelsStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoadChannelsSuccess);
        done();
    });
});
