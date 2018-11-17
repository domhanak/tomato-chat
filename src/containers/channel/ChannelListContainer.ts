import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {IState} from '../../common/IState';
import {ChannelFilter} from '../../constants/ChannelFilter';
import {IChannel} from '../../models/IChannel';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import * as Immutable from 'immutable';
import {updateChannelOrder} from '../../actions/channel/updateChannel';


const getChannelsForUser = createSelector<IState, ChannelFilter, Immutable.List<IChannel>, Immutable.Map<Uuid, IChannel>, Immutable.List<IChannel>>(
    [
        state => state.tomatoApp.channelFilter,
        state => state.tomatoApp.channels.allChannels,
        state => state.tomatoApp.channels.channelsById,
    ],
    (channelFilter, allChannels, channelsById) => {
        switch (channelFilter) {
            case ChannelFilter.All:
                return allChannels;

            case ChannelFilter.Starred:
                return allChannels.filter((channel: IChannel) => channelsById.get(channel.id) !== undefined ).toList();

            case ChannelFilter.Muted:
                return allChannels.filter((channel: IChannel) => !channelsById.get(channel.id) !== undefined).toList();

            default:
                throw new Error(`Unknown value of visibility filter '${channelFilter}'`);
        }
    });

const mapStateToProps = (state: IState): IChannelListProps => {
    return {
        channels: getChannelsForUser(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelListDispatchProps => {
    return {
        updateChannelOrder: (channel: IChannel) => dispatch(updateChannelOrder(channel.id, channel.order)),
    };
};

export const ChannelListContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
