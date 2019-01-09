import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {
    authTokenHelper,
    channelHelper,
    channelServerModel,
    channelServerModelResponse,
    dispatch
} from '../helpers/helpers';
import {
    TOMATO_APP_CHANNEL_CREATE_STARTED,
    TOMATO_APP_CHANNEL_CREATE_SUCCESS,
} from '../../../constants/actionTypes';
import {channelCreateFailed,
        channelCreateStarted,
        channelCreateSuccess,
        createChannelCreateFactory
} from '../../../actions/channel/createChannel';
import {expectedUserChannelStarted, userServerModelHelper} from '../../users/helpers/helpers';

describe('Channel create thunk action tests.', () => {
    const expectedCreateChannelStarted = {type: TOMATO_APP_CHANNEL_CREATE_STARTED};

    const expectedCreateChannelSuccess = {type: TOMATO_APP_CHANNEL_CREATE_SUCCESS,
        payload: {
            channel: channelHelper,
        }};

    const channelCreate = (authToken: AuthToken, channel: IChannelServerModel) => {
        console.log(authToken + channel.name);
        return Promise.resolve({data: channelServerModelResponse});
    };

    const createTestCreateDependencies = {
        channelCreateStarted,
        channelCreateFailed,
        channelCreateSuccess,
        channelCreate
    };

    test('Dispatch thunks in correct order: createChannel.', async done => {
        await createChannelCreateFactory(createTestCreateDependencies)
            (authTokenHelper, channelServerModel, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateChannelSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserChannelStarted);
        done();
    });
});
