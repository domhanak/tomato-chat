import {
    TOMATO_APP_LOADING_CHANNELS_FAILED,
    TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from '../../../constants/actionTypes';
import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    channelHelper,
    expectedLoadingChannelsStarted, loadAllChannelsTest, loadAllChannelsTestRejected
} from '../helpers/helpers';
import {
    createLoadAllChannelFactory,
    loadingFailed,
    loadingStarted,
    loadingSuccess
} from '../../../actions/channel/loadChannels';
import {errorMessageLoadingChannels} from '../../../constants/errorMessages';

describe('Load channels thunk tests.', () => {
    const expectedLoadChannelsSuccess = {type: TOMATO_APP_LOADING_CHANNELS_SUCCESS,
        payload: {
            channels: [channelHelper],
        }};

    const expectedLoadChannelsFailed = {type: TOMATO_APP_LOADING_CHANNELS_FAILED,
        payload: errorMessageLoadingChannels};

    const createTestLoadChannelsDependencies = (promise: boolean) => {
        return {
            loadingStarted,
            loadingSuccess,
            loadingFailed,
            loadAllChannels: promise ? loadAllChannelsTest : loadAllChannelsTestRejected,
        };
    };

    test('Dispatch thunks in correct order, resolved: loadChannels.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllChannelFactory(createTestLoadChannelsDependencies(resolvedPromise))(authTokenHelper)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedLoadingChannelsStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoadChannelsSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: loadChannels.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllChannelFactory(createTestLoadChannelsDependencies(rejectedPromise))(authTokenHelper)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedLoadingChannelsStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoadChannelsFailed);
        done();
    });
});
