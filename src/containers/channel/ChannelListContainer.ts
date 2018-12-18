import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import {updateChannelOrder} from '../../actions/channel/updateChannelOrder';
import {IChannelServerModel} from '../../models/IChannelServerModel';

const mapStateToProps = (state: IState): IChannelListProps => {
    return {
        allChannels: state.tomatoApp.channels.channelsById.toList(),
        authToken: state.tomatoApp.authToken,
    };
};
const mapDispatchToProps = (dispatch: Dispatch): IChannelListDispatchProps => {
    return {
        updateChannelOrder: (authToken: AuthToken,
                             channelId: Uuid, channel: IChannelServerModel,
                             neighbourId: Uuid, neighbour: IChannelServerModel) => {
            updateChannelOrder(authToken, channelId, channel, neighbourId, neighbour)(dispatch);
        },
    };
};

export const ChannelListContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
