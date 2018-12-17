import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IChannelCallBackProps, IChannelOwnProps, IChannelStateProps, Channel} from '../../components/channel/Channel';
import {startEditingChannel} from '../../actions/actionCreators';
import {updateChannel, updateChannelUsers} from '../../actions/channel/updateChannel';
import {List} from 'immutable';
import {updateUser} from '../../actions/users/updateUser';
import * as Immutable from 'immutable';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';

const mapStateToProps = (state: IState, ownProps: IChannelOwnProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        allUsers: state.tomatoApp.users.usersById.toList(),
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onChannelNameChange: (channelName: string) => dispatch(updateChannel(ownProps.id, channelName)),
        updateChannelUsers: (users: List<Uuid>, user: IUser, channels: Immutable.List<Uuid>, authToken: AuthToken) => {
            dispatch(updateChannelUsers(ownProps.id, users));
            updateUser(authToken, {email: user.email, customData:
                    {nickname: user.nickname, id: user.id, channels}} as IUserServerModel)(dispatch);
        },
    };
};

export const ChannelContainer = connect<IChannelStateProps, IChannelCallBackProps, IChannelOwnProps>(mapStateToProps, mapDispatchToProps)(Channel);
