import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createMessage} from '../../actions/message/createMessage';
import { IMessageFormDispatchProps, IMessageFormOwnProps, MessageForm} from '../../components/message/MessageForm';
import { IState} from '../../common/IState';
import {IMessageServerModel} from '../../models/IMessageServerModel';
import {IUser} from '../../models/IUser';
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

const mapStateToProps = (state: IState): IMessageFormOwnProps => {
    return {
        loggedUser: state.tomatoApp.loggedUser ?
            state.tomatoApp.loggedUser : state.tomatoApp.users.usersById.find((user: IUser) => (user.id === state.tomatoApp.userId)),
        authToken: state.tomatoApp.authToken,
        selectedChannel: state.tomatoApp.loggedUser ? state.tomatoApp.loggedUser.selectedChannel : '',
        usersForAnnotation: getAvailableUsersToAnnotate(state),
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
