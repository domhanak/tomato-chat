import { connect } from 'react-redux';
// import { createSelector } from 'reselect';
import {IState} from '../../common/IState';
// import {ChannelFilter} from '../../constants/ChannelFilter';
// import {IChannel} from '../../models/IChannel';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
// import * as Immutable from 'immutable';
import {updateChannelOrder} from '../../actions/channel/updateChannel';


// const getChannelsForUser = createSelector<IState, ChannelFilter, Immutable.List<Uuid>, Immutable.Map<Uuid, IChannel>, Immutable.List<Uuid>>(
//     [
//         state => state.tomatoApp.channelFilter,
//         state => state.tomatoApp.channels.allChannelIds,
//         state => state.tomatoApp.channels.channelsById,
//     ],
//     (channelFilter, allChannelsIds, channelsById) => {
//         switch (channelFilter) {
//             case ChannelFilter.All:
//                 return allChannelsIds;
//
//             case ChannelFilter.Starred:
//                 return allChannelsIds.filter((id: Uuid) => channelsById.get(id) !== undefined ).toList();
//
//             case ChannelFilter.Muted:
//                 return allChannelsIds.filter((id: Uuid) => !channelsById.get(id) !== undefined).toList();
//
//             default:
//                 throw new Error(`Unknown value of visibility filter '${channelFilter}'`);
//         }
//     });

const mapStateToProps = (state: IState): IChannelListProps => {
    return {
        // channelIds: getChannelsForUser(state),
        allChannels: state.tomatoApp.channels.channelsById.toList(),
    };
};
const mapDispatchToProps = (dispatch: Dispatch): IChannelListDispatchProps => {
    return {
        updateChannelOrder: (channelId: Uuid, newOrder: number, channelId2: Uuid, newOrder2: number) => dispatch(
            updateChannelOrder(channelId, newOrder, channelId2, newOrder2)),
    };
};

export const ChannelListContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
