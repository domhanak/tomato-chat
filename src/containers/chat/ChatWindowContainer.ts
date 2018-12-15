import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../../common/IState';
import {ChatWindow, IChatWindowDispatchProps, IChatWindowStateProps} from '../../components/chat/ChatWindow';
import {loadUsers} from '../../actions/users/loadUsers';
import {loadChannels} from '../../actions/channel/loadChannels';

const mapStateToProps = (state: IState) => {
    return {
        isEditing: state.tomatoApp.isEditing,
        isTyping: state.tomatoApp.isTyping,
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: (authToken: string | null) => loadUsers(authToken)(dispatch),
        loadChannels: (authToken: string | null) => loadChannels(authToken)(dispatch),
    };
};

export const ChatWindowContainer = connect<IChatWindowStateProps, IChatWindowDispatchProps>(mapStateToProps, mapDispatchToProps)(ChatWindow);
