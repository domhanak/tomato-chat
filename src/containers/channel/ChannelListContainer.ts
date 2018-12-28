import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps, IChannelListDispatchProps} from '../../components/channel/ChannelList';
import {Dispatch} from 'redux';
import {updateChannelOrder} from '../../actions/channel/updateChannelOrder';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {deleteChannel} from '../../actions/channel/deleteChannel';
import {List} from 'immutable';
import {IChannel} from '../../models/IChannel';
import {updateChannel} from '../../actions/channel/updateChannel';
import {serverModelChannelMapper} from '../../common/utils/utilFunctions';

const mapStateToProps = (state: IState): IChannelListProps => {
    let channels = List<IChannel>();
    const loggedUser = state.tomatoApp.loggedUser;

    state.tomatoApp.channels.channelsById.forEach((value: IChannel, _) => {


        if (List(value.users).contains(loggedUser!.id) || value.owner === loggedUser!.id) {
           channels = channels.push(value);
       }
    });

    return {
        allChannels: channels,
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
        onChannelDelete: (deletedChannelId: Uuid,
                          channels: List<IChannel>, authToken: AuthToken) => {
            deleteChannel(authToken, deletedChannelId)(dispatch);

            channels.forEach((channel: IChannel) => {
               updateChannel(authToken, serverModelChannelMapper(channel), channel.id)(dispatch);
            });
        },
    };
};

export const ChannelListContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
