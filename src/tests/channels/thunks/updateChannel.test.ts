import {createUpdateChannelFactory, updateChannelSuccess, updateChannelStarted, updateChannelFailed} from '../../../actions/channel/updateChannel';
import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {
    channelHelper,
    channelServerModel,
    channelServerModelResponse,
} from '../helpers/helpers';
import {authTokenHelper, dispatch} from '../../baseHelpers';
import {TOMATO_APP_CHANNEL_EDITING_STARTED, TOMATO_APP_CHANNEL_EDITING_SUCCESS} from '../../../constants/actionTypes';

describe('Channel update thunk action tests.', () => {
    const expectedUpdateChannelStarted = {type: TOMATO_APP_CHANNEL_EDITING_STARTED,
        payload: {
            id: channelHelper.id,
        }};

    const expectedUpdateChannelSuccess = {type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
        payload: {
            channel: channelHelper,
        }};

    const updateChannelApiCall = (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => {
        console.log(authToken + channelId + channel.name);
        return Promise.resolve({data: channelServerModelResponse});
    };

    const createTestUpdateDependencies = {
        updateChannelStarted,
        updateChannelFailed,
        updateChannelSuccess,
        updateChannelApiCall
    };

    test('Dispatch thunks in correct order: updateChannel.', async done => {
        await createUpdateChannelFactory(createTestUpdateDependencies)(authTokenHelper, channelServerModel, channelHelper.id)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateChannelSuccess);
        done();
    });
})
