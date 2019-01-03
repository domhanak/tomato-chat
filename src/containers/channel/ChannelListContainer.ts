import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import {updateChannelOrder} from '../../actions/channel/updateChannelOrder';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {List} from 'immutable';
import {IChannel} from '../../models/IChannel';

const mapStateToProps = (state: IState): IChannelListProps => {
    let allChannels = List<IChannel>();
    const loggedUser = state.tomatoApp.loggedUser;

    state.tomatoApp.channels.channelsById.forEach((value: IChannel, _) => {
        if (List(value.users).contains(loggedUser!.id) || value.owner === loggedUser!.id) {
            const index = List(state.tomatoApp.loggedUser!.channels).indexOf(value.id);
            allChannels = allChannels.insert(index, value);
       }
    });

    return {
        allChannels,
        authToken: state.tomatoApp.authToken,
        loggedUser,
        allUsers: state.tomatoApp.users.usersById.toList(),
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
