import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createMessage} from '../../actions/message/createMessage';
import {IMessageFormDispatchProps, MessageForm} from '../../components/message/MessageForm';


const mapDispatchToProps = (dispatch: Dispatch): IMessageFormDispatchProps => {
    return {
        onMessageAdd: (text: string, username: string) => dispatch(createMessage(text, username))
    };
};

export const MessageFormContainer = connect(undefined, mapDispatchToProps)(MessageForm);
