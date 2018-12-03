import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {IChannelListItemsProps, IChannelListItemStateProps, ChannelListItem} from '../../components/channel/ChannelListItem';

const mapStateToProps = (state: IState, ownProps: IChannelListItemsProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
    };
};

export const ChannelListItemContainer = connect<IChannelListItemStateProps, IChannelListItemsProps>(mapStateToProps)(ChannelListItem);
