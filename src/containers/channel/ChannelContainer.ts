import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IChannelCallBackProps, IChannelOwnProps, IChannelStateProps, Channel} from '../../components/channel/Channel';
import {startEditingChannel} from '../../actions/actionCreators';
import {updateChannel} from '../../actions/channel/updateChannel';
import {IUserServerModel} from '../../models/IUserServerModel';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {registerUser} from '../../actions/users/registerUser';

const mapStateToProps = (state: IState, ownProps: IChannelOwnProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        allUsers: state.tomatoApp.users.usersById.toList(),
        authToken: state.tomatoApp.authToken,
        loggedUser: state.tomatoApp.loggedUser!,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onChannelNameChange: (channelId: Uuid, channel: IChannelServerModel, authToken: AuthToken) =>
            updateChannel(authToken, channel, channelId)(dispatch),
        onChannelChange: (channelId: Uuid, channel: IChannelServerModel, authToken: AuthToken) => {
            updateChannel(authToken, channel, channelId)(dispatch);
        },
        onUserRegistration: (authToken: AuthToken, user: IUserServerModel) => registerUser(authToken, user)(dispatch),
    };
};

export const ChannelContainer = connect<IChannelStateProps, IChannelCallBackProps, IChannelOwnProps>(mapStateToProps, mapDispatchToProps)(Channel);
