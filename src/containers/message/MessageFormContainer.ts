import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createMessage} from '../../actions/message/createMessage';
import { IMessageFormDispatchProps, IMessageFormOwnProps, MessageForm} from '../../components/message/MessageForm';
import { IState} from '../../common/IState';
import {IUser} from '../../models/IUser';
import {IMessageServerModel} from '../../models/IMessageServerModel';

const mapStateToProps = (state: IState): IMessageFormOwnProps => {
    return {
        loggedUser: state.tomatoApp.users.usersById.find((user: IUser) => (user.id === state.tomatoApp.userId)),
        authToken: state.tomatoApp.authToken,
        selectedChannel: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.selectedChannel: '',
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMessageFormDispatchProps => {
    return {
        onMessageAdd: (message: IMessageServerModel, channelId: Uuid, authToken: AuthToken) => {
            createMessage(authToken, channelId, message)(dispatch);
        }
    };
};

export const MessageFormContainer = connect(mapStateToProps, mapDispatchToProps)(MessageForm);
