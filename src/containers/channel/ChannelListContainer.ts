import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import {updateChannelOrder} from '../../actions/channel/updateChannel';

const mapStateToProps = (state: IState): IChannelListProps => {
    return {
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
