import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createMessage} from '../../actions/message/createMessage';
import { IMessageFormDispatchProps, IMessageFormOwnProps, MessageForm} from '../../components/message/MessageForm';
import { IState} from '../../common/IState';
import { IUser} from '../../models/IUser';

const mapStateToProps = (state: IState): IMessageFormOwnProps => {
    return {
        loggedUser: state.tomatoApp.users.usersById.find((user: IUser) => (user.id === state.tomatoApp.userId)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMessageFormDispatchProps => {
    return {
        onMessageAdd: (text: string, username: string) => dispatch(createMessage(text, username))
    };
};

export const MessageFormContainer = connect(mapStateToProps, mapDispatchToProps)(MessageForm);
