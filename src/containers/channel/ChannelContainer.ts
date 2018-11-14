import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IChannelCallBackProps, IChannelOwnProps, IChannelStateProps, Channel} from '../../components/channel/Channel';
import {cancelEditingChannel, startEditingChannel} from '../../actions/actionCreators';
import {updateChannel, updateChannelUsers} from '../../actions/channel/updateChannel';
import {IUser} from '../../models/IUser';
import {List} from 'immutable';

const mapStateToProps = (state: IState, ownProps: IChannelOwnProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedChannelId === ownProps.id,
        allUsers: state.tomatoApp.users.allUsers,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingChannel(ownProps.id)),
        onChannelNameChange: (channelName: string) => dispatch(updateChannel(ownProps.id, channelName)),
        updateChannelUsers: (users: List<IUser>) => {
            dispatch(updateChannelUsers(ownProps.id, users));
            // dispatch(updateUserChannels());
        },
    };
};

export const ChannelContainer = connect<IChannelStateProps, IChannelCallBackProps, IChannelOwnProps>(mapStateToProps, mapDispatchToProps)(Channel);
