import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IMessageDispatchProps, IMessageOwnProps, IMessageStateProps, Message} from '../../components/message/Message';
import {cancelEditingMessage, startEditingMessage} from '../../actions/actionCreators';
const mapStateToProps = (state: IState, ownProps: IMessageOwnProps) => {
    return {
        message: state.tomatoApp.messages.messagesById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedMessageId === ownProps.id,
        userId: state.tomatoApp.userId,
        username: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.nickname : '',
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IMessageOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingMessage(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingMessage(ownProps.id)),
        onEdit: (text: string) => dispatch(startEditingMessage((text) ? ownProps.id : ownProps.id)),
    };
};

export const MessageContainer = connect<IMessageStateProps, IMessageDispatchProps, IMessageOwnProps>(mapStateToProps, mapDispatchToProps)(Message);
