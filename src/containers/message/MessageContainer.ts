import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IMessageDispatchProps, IMessageOwnProps, IMessageStateProps, Message} from '../../components/message/Message';
import {cancelEditingMessage, startEditingMessage} from '../../actions/actionCreators';
import {updateMessage} from '../../actions/message/updateMessage';

const mapStateToProps = (state: IState, ownProps: IMessageOwnProps) => {
    return {
        message: state.tomatoApp.messages.messagesById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedMessageId === ownProps.id,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IMessageOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingMessage(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingMessage(ownProps.id)),
        onEdit: (text: string) => dispatch(updateMessage(ownProps.id, text)),
    };
};

export const MessageContainer = connect<IMessageStateProps, IMessageDispatchProps, IMessageOwnProps>(mapStateToProps, mapDispatchToProps)(Message);
