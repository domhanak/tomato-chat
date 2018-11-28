import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {IState} from '../../common/IState';
import {ChannelFilter} from '../../constants/ChannelFilter';
import {IChannel} from '../../models/IChannel';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import * as Immutable from 'immutable';
import {updateChannelOrder} from '../../actions/channel/updateChannel';


const getChannelsForUser = createSelector<IState, ChannelFilter, Immutable.List<Uuid>, Immutable.Map<Uuid, IChannel>, Immutable.List<Uuid>>(
    [
        state => state.tomatoApp.channelFilter,
        state => state.tomatoApp.channels.allChannelIds,
        state => state.tomatoApp.channels.channelsById,
    ],
    (channelFilter, allChannelsIds, channelsById) => {
        switch (channelFilter) {
            case ChannelFilter.All:
                return allChannelsIds;

            case ChannelFilter.Starred:
                return allChannelsIds.filter((id: Uuid) => channelsById.get(id) !== undefined ).toList();

            case ChannelFilter.Muted:
                return allChannelsIds.filter((id: Uuid) => !channelsById.get(id) !== undefined).toList();

            default:
                throw new Error(`Unknown value of visibility filter '${channelFilter}'`);
        }
    });

const mapStateToProps = (state: IState): IChannelListProps => {
    return {
        channelIds: getChannelsForUser(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelListDispatchProps => {
    return {
        updateChannelOrder: (channel: IChannel, newOrder: number) => dispatch(updateChannelOrder(channel.id, newOrder)),
    };
};

export const ChannelListContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
