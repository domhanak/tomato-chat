import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IChannelCallBackProps, IChannelOwnProps, IChannelStateProps, Channel} from '../../components/channel/Channel';
import {startEditingChannel} from '../../actions/actionCreators';
import {updateChannel} from '../../actions/channel/updateChannel';
import {updateUser} from '../../actions/users/updateUser';
import * as Immutable from 'immutable';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {IChannelServerModel} from '../../models/IChannelServerModel';

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
        onChannelNameChange: (channelId: Uuid, channel: IChannelServerModel, authToken: AuthToken) =>
            updateChannel(authToken, channel, channelId)(dispatch),
        updateChannelUsers: (channelId: Uuid, channel: IChannelServerModel, user: IUser, channels: Immutable.List<Uuid>, authToken: AuthToken) => {
            updateChannel(authToken, channel, channelId)(dispatch);
            updateUser(authToken, {email: user.email, customData:
                    {nickname: user.nickname, id: user.id, channels, selectedChannel: user.selectedChannel}} as IUserServerModel)(dispatch);
        },
    };
};

export const ChannelContainer = connect<IChannelStateProps, IChannelCallBackProps, IChannelOwnProps>(mapStateToProps, mapDispatchToProps)(Channel);
