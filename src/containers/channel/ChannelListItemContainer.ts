import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {
    IChannelListItemProps,
    IChannelListItemStateProps,
    ChannelListItem,
    IChannelListItemCallBackProps
} from '../../components/channel/ChannelListItem';
import {Dispatch} from 'redux';
import {cancelEditingChannel, startEditingChannel} from '../../actions/actionCreators';
import {updateUser} from '../../actions/users/updateUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {loadMessages} from '../../actions/message/loadMessages';
import {IUser} from '../../models/IUser';
import {deleteChannel} from '../../actions/channel/deleteChannel';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {updateChannel} from '../../actions/channel/updateChannel';

const mapStateToProps = (state: IState, ownProps: IChannelListItemProps) => {
    const user: IUser | null = state.tomatoApp.users.usersById.find((_, key: Uuid) => { return key === ownProps.ownerId; });
    const ownerNickname = user != null ? user.nickname : '' ;
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedChannelId === ownProps.id,
        ownerNickname,
        authToken: state.tomatoApp.authToken,
        loggedUser: state.tomatoApp.loggedUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelListItemProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingChannel(ownProps.id)),
        onChannelSelection: (authToken: AuthToken, user: IUserServerModel) => {
            updateUser(authToken, user)(dispatch);
            loadMessages(authToken, user.customData.selectedChannel);
        },
        onChannelDelete: (deletedChannelId: Uuid, authToken: AuthToken, user: IUserServerModel) => deleteChannel(authToken, deletedChannelId, user)(dispatch),
        onChannelRemove: (channel: IChannelServerModel, channelId: Uuid, user: IUserServerModel, authToken: AuthToken) => {
            updateChannel(authToken, channel, channelId)(dispatch);
            updateUser(authToken, user)(dispatch);
        },
        updateChannelOrder: (user: IUserServerModel, authToken: AuthToken) => updateUser(authToken, user)(dispatch),
    };
};

export const ChannelListItemContainer = connect<IChannelListItemStateProps, IChannelListItemCallBackProps, IChannelListItemProps>(mapStateToProps, mapDispatchToProps)(ChannelListItem);
