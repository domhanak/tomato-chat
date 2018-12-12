import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IChannelCallBackProps, IChannelOwnProps, IChannelStateProps, Channel} from '../../components/channel/Channel';
import {startEditingChannel} from '../../actions/actionCreators';
import {updateChannel, updateChannelUsers} from '../../actions/channel/updateChannel';
import {List} from 'immutable';
import {updateUserChannels} from '../../actions/users/updateUser';
import * as Immutable from 'immutable';

const mapStateToProps = (state: IState, ownProps: IChannelOwnProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        allUsers: state.tomatoApp.users.usersById.toList(),
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onChannelNameChange: (channelName: string) => dispatch(updateChannel(ownProps.id, channelName)),
        updateChannelUsers: (users: List<Uuid>, userId: Uuid, channels: Immutable.List<Uuid>) => {
            dispatch(updateChannelUsers(ownProps.id, users));
            dispatch(updateUserChannels(userId, channels));
        },
    };
};

export const ChannelContainer = connect<IChannelStateProps, IChannelCallBackProps, IChannelOwnProps>(mapStateToProps, mapDispatchToProps)(Channel);
