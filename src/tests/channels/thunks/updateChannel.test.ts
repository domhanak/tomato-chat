import {createUpdateChannelFactory, updateChannelSuccess, updateChannelStarted, updateChannelFailed} from '../../../actions/channel/updateChannel';
import {IChannelServerModel} from '../../../models/IChannelServerModel';
import {
    channelHelper,
    channelServerModel,
    channelServerModelResponse,
} from '../helpers/helpers';
import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    TOMATO_APP_CHANNEL_EDITING_FAILED,
    TOMATO_APP_CHANNEL_EDITING_STARTED,
    TOMATO_APP_CHANNEL_EDITING_SUCCESS
} from '../../../constants/actionTypes';
import {errorMessageChannelEditing} from '../../../constants/errorMessages';

describe('Channel update thunk action tests.', () => {
    const expectedUpdateChannelStarted = {type: TOMATO_APP_CHANNEL_EDITING_STARTED,
        payload: {
            id: channelHelper.id,
        }};

    const expectedUpdateChannelSuccess = {type: TOMATO_APP_CHANNEL_EDITING_SUCCESS,
        payload: {
            channel: channelHelper,
        }};

    const expectedUpdateChannelFailed = {type: TOMATO_APP_CHANNEL_EDITING_FAILED,
        payload: errorMessageChannelEditing};

    const updateChannelApiCall = (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => {
        return Promise.resolve({data: channelServerModelResponse});
    };

    const updateChannelApiCallReject = (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => {
        return Promise.reject({error: {}});
    };

    const createTestUpdateDependencies = (promise: boolean) => {
        return {
            updateChannelStarted,
            updateChannelFailed,
            updateChannelSuccess,
            updateChannelApiCall: promise ? updateChannelApiCall : updateChannelApiCallReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: updateChannel.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUpdateChannelFactory(createTestUpdateDependencies(resolvedPromise))
            (authTokenHelper, channelServerModel, channelHelper.id)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateChannelSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: updateChannel.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUpdateChannelFactory(createTestUpdateDependencies(rejectedPromise))
        (authTokenHelper, channelServerModel, channelHelper.id)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUpdateChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUpdateChannelFailed);
        done();
    });
})
