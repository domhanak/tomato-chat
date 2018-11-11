import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../../common/IState';
import {ChatWindow, IChatWindowDispatchProps, IChatWindowStateProps} from '../../components/chat/ChatWindow';
import {loadUsers} from '../../actions/users/loadUsers';

const mapStateToProps = (state: IState) => {
    return {
        isEditing: state.tomatoApp.isEditing,
        isTyping: state.tomatoApp.isTyping,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers())
    };
};

export const ChatWindowContainer = connect<IChatWindowStateProps, IChatWindowDispatchProps>(mapStateToProps, mapDispatchToProps)(ChatWindow);
