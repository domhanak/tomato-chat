import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import {updateChannelOrder} from '../../actions/channel/updateChannelOrder';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {deleteChannel} from '../../actions/channel/deleteChannel';
import {updateUser} from '../../actions/users/updateUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {List} from 'immutable';
import {IChannel} from '../../models/IChannel';
import {updateChannel} from '../../actions/channel/updateChannel';
import {serverModelChannelMapper} from '../../common/utils/utilFunctions';

const mapStateToProps = (state: IState): IChannelListProps => {
    let channels = List<IChannel>();
    state.tomatoApp.loggedUser!.channels.forEach((id: Uuid) => {
        const channel = state.tomatoApp.channels!.channelsById.get(id);
        if (channel) {
            channels = channels.push(channel);
        }
    });
    return {
        allChannels: channels,
        authToken: state.tomatoApp.authToken,
        loggedUser: state.tomatoApp.loggedUser,
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
        onChannelDelete: (deletedChannelId: Uuid, users: List<IUserServerModel>,
                          channels: List<IChannel>, authToken: AuthToken) => {
            deleteChannel(authToken, deletedChannelId)(dispatch);

            users.forEach((user: IUserServerModel) => {
                updateUser(authToken, user)(dispatch);
            });

            channels.forEach((channel: IChannel) => {
               updateChannel(authToken, serverModelChannelMapper(channel), channel.id)(dispatch);
            });
        },
    };
};

export const ChannelListContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
