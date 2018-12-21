import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IMessageDispatchProps, IMessageOwnProps, IMessageStateProps, Message} from '../../components/message/Message';
import {cancelEditingMessage, startEditingMessage} from '../../actions/actionCreators';
import {updateMessage} from "../../actions/message/updateMessage";
import {IMessage} from "../../models/IMessage";
const mapStateToProps = (state: IState, ownProps: IMessageOwnProps) => {
    return {
        message: state.tomatoApp.messages.messagesById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedMessageId === ownProps.id,
        username: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.nickname : '',
        selectedChannel: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.selectedChannel : '',
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IMessageOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingMessage(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingMessage(ownProps.id)),
        onEdit:  (authToken: string | null, message: IMessage, channelId: Uuid, newMessage: string) => {
            updateMessage(authToken, message, channelId, newMessage)(dispatch);
        }
    };
};

export const MessageContainer = connect<IMessageStateProps, IMessageDispatchProps, IMessageOwnProps>(mapStateToProps, mapDispatchToProps)(Message);
