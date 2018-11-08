import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../common/IState';
import { loadUsers } from '../actions/loadUsers';
import { loadChannels } from '../actions/loadChannels';
import { loadMessages } from '../actions/loadMessages';
import {ChatWindow, IChatWindowDispatchProps, IChatWindowStateProps} from '../components/chat/ChatWindow';

const mapStateToProps = (state: IState) => {
    return {
        isEditing: state.tomatoApp.isEditing,
        isTyping: state.tomatoApp.isTyping,
        loggedUser: state.tomatoApp.loggedUser,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        loadChannels: () => dispatch(loadChannels()),
        loadMessages: () => dispatch(loadMessages()),
    };
};

export const ChatWindowContainer = connect<IChatWindowStateProps, IChatWindowDispatchProps>(mapStateToProps, mapDispatchToProps)(ChatWindow);
