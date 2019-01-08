import {createUpdateChannelFactory} from '../../../actions/channel/updateChannel';
import {IChannel} from '../../../models/IChannel';
import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {
    authTokenHelper,
    channelHelper,
    channelServerModel,
    channelServerModelResponse,
    dispatch
} from '../helpers/helpers';

describe('Channel update thunk action tests.', () => {
    const expectedUpdateChannelStarted = {type: 'updateChannelStarted',
        payload: {
            id: channelHelper.id,
        }};

    const expectedUpdateChannelSuccess = {type: 'updateChannelSuccess',
        payload: {
            channel: channelHelper,
        }};

    const updateChannelStarted = (id: Uuid): Action => ({
        type: 'updateChannelStarted',
        payload: {
            id,
        }
    });

    const updateChannelFailed = (): Action => ({
        type: 'updateChannelFailed',
    });

    const updateChannelSuccess = (channel: IChannel): Action => ({
        type: 'updateChannelSuccess',
        payload: {
            channel,
        }
    });

    const updateChannelApiCall = (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => {
        console.log(authToken + channelId + channel.name);
        return Promise.resolve({data: channelServerModelResponse});
    };

    const createFakeUpdateDependencies = {
        updateChannelStarted,
        updateChannelFailed,
        updateChannelSuccess,
        updateChannelApiCall
    };

    test('Dispatch thunks in correct order: updateChannel.', async done => {

        await createUpdateChannelFactory(createFakeUpdateDependencies)(authTokenHelper, channelServerModel, channelHelper.id)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateChannelSuccess);
        done();
    });
})
