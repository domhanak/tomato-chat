import * as Immutable from "immutable";
import {IChannel} from "../../../models/IChannel";
import {IMessage} from "../../../models/IMessage";
import {channels} from "../../../reducers/channel/channels";
import {
    TOMATO_APP_CHANNEL_CREATE_SUCCESS, TOMATO_APP_CHANNEL_EDITING_SUCCESS,
    TOMATO_APP_CHANNEL_ORDER_STARTED,
    TOMATO_APP_LOADING_CHANNELS_STARTED,
    TOMATO_APP_LOADING_CHANNELS_SUCCESS
} from "../../../constants/actionTypes";

const channelInitial = ({
    id: '123-456',
    name: 'tomato',
    owner: '789',
    users: Immutable.List<Uuid>(),
    messages: Immutable.List<IMessage>(),
}) as IChannel;

const channelUpdated = ({
    id: '123-456',
    name: 'ketchup',
    owner: '789',
    users: Immutable.List<Uuid>(),
    messages: Immutable.List<IMessage>(),
}) as IChannel;

const dummyEmptyState = () => ({
    allChannelIds: Immutable.List<Uuid>(),
    channelsById: Immutable.Map<Uuid, IChannel>(),
});

const dummyStateWithOneChannel = () => ({
    allChannelIds: Immutable.List<Uuid>(['123-456']),
    channelsById: Immutable.Map<Uuid, IChannel>({'123-456': channelInitial}),
});

const dummyStateWithOneUpdatedChannel = () => ({
    allChannelIds: Immutable.List<Uuid>(['123-456']),
    channelsById: Immutable.Map<Uuid, IChannel>({'123-456': channelUpdated}),
});

describe('channels reducer tests', () => {

    it('should return the initial state', () => {
        expect(channels(undefined, {type: ''}))
            .toEqual(dummyEmptyState())
    });

    it('should return the previous state', () => {
        expect(channels(dummyStateWithOneChannel(), {type: ''}))
            .toEqual(dummyStateWithOneChannel())
    });

    it('should handle TOMATO_APP_LOADING_CHANNELS_SUCCESS', () => {
        expect(channels(dummyEmptyState(), {type: TOMATO_APP_LOADING_CHANNELS_SUCCESS, payload: {
                channels: [channelInitial],
            }}))
            .toEqual(dummyStateWithOneChannel())
    });

    it('should handle TOMATO_APP_LOADING_CHANNELS_STARTED', () => {
        expect(channels(dummyStateWithOneChannel(), {type: TOMATO_APP_LOADING_CHANNELS_STARTED}))
            .toEqual(dummyStateWithOneChannel())
    });

    it('should handle TOMATO_APP_CHANNEL_ORDER_STARTED', () => {
        expect(channels(dummyStateWithOneChannel(), {type: TOMATO_APP_CHANNEL_ORDER_STARTED}))
            .toEqual(dummyStateWithOneChannel())
    });

    it('should handle TOMATO_APP_CHANNEL_CREATE_SUCCESS', () => {
        const channel = channelInitial;
        expect(channels(dummyEmptyState(), {type: TOMATO_APP_CHANNEL_CREATE_SUCCESS, payload: {
            channel
        }})).toEqual(dummyStateWithOneChannel())
    });

    it('should handle TOMATO_APP_CHANNEL_EDITING_SUCCESS', () => {
        const channel = channelUpdated;
        expect(channels(dummyStateWithOneChannel(), {type: TOMATO_APP_CHANNEL_EDITING_SUCCESS, payload: {
                channel
            }})).toEqual(dummyStateWithOneUpdatedChannel())
    });
});
