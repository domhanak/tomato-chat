import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IMessageDispatchProps, IMessageOwnProps, IMessageStateProps, Message} from '../../components/message/Message';
import {cancelEditingMessage, startEditingMessage} from '../../actions/actionCreators';
import {updateMessage} from '../../actions/message/updateMessage';
import {IMessage} from '../../models/IMessage';
import {deleteMessage} from '../../actions/message/deleteMessage';
import {IMessageServerModel} from '../../models/IMessageServerModel';
import {IUserAnnotation} from '../../models/IUserAnnotation';

const getAvailableUsersToAnnotate = (state: IState): any => {
    const annotatedUsers: IUserAnnotation[] = [];
    for (const user of state.tomatoApp.users.usersById.toArray()) {
        annotatedUsers.push({
            text: user.nickname,
            value: user.nickname,
            url: user.nickname,
        });
    }

    return annotatedUsers;
};

const mapStateToProps = (state: IState, ownProps: IMessageOwnProps) => {
    return {
        message: state.tomatoApp.messages.messagesById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedMessageId === ownProps.id,
        username: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.nickname : '',
        avatarId: state.tomatoApp.avatarUri ? state.tomatoApp.avatarUri : '',
        selectedChannel: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.selectedChannel : '',
        authToken: state.tomatoApp.authToken,
        usersForAnnotation: getAvailableUsersToAnnotate(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IMessageOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingMessage(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingMessage(ownProps.id)),
        onEdit:  (authToken: string | null, message: IMessage, channelId: Uuid, newMessage: IMessageServerModel) => {
            updateMessage(authToken, message, channelId, newMessage)(dispatch);
        },
        onDelete:  (authToken: string | null, messageId: Uuid, channelId: Uuid) => {
            deleteMessage(authToken, messageId, channelId)(dispatch);
        },
    };
};

export const MessageContainer = connect<IMessageStateProps, IMessageDispatchProps, IMessageOwnProps>(mapStateToProps, mapDispatchToProps)(Message);
