import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../common/IState';
import { loadUsers } from '../actions/loadUsers';
import { ITomatoAppDispatchProps, ITomatoAppStateProps, TomatoApp } from '../components/TomatoApp';
import {loadChannels} from "../actions/loadChannels";
import {loadMessages} from "../actions/loadMessages";

const mapStateToProps = (state: IState) => {
    return {
        isEditing: state.tomatoApp.isEditing,
        isTyping: state.tomatoApp.isTyping,
        loggedUser: state.tomatoApp.loggedUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        loadChannels: () => dispatch(loadChannels()),
        loadMessages: () => dispatch(loadMessages()),
    };
};

export const TomatoAppContainer = connect<ITomatoAppStateProps, ITomatoAppDispatchProps>(mapStateToProps, mapDispatchToProps)(TomatoApp);
