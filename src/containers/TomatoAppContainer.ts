import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../common/IState';
import { loadUsers } from '../actions/loadUsers';
import { ITomatoAppDispatchProps, ITomatoAppStateProps, TomatoApp } from '../components/TomatoApp';
import {IUser} from '../models/IUser';

const mapStateToProps = (state: IState) => {
    return {
        isEditing: state.tomatoApp.isEditing,
        isTyping: state.tomatoApp.isTyping,
        loggedUser: state.tomatoApp.users.usersById.filter((user: IUser, key: Uuid) => (user.isLoggedIn && key != null)).first(),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
    };
};

export const TomatoAppContainer = connect<ITomatoAppStateProps, ITomatoAppDispatchProps>(mapStateToProps, mapDispatchToProps)(TomatoApp);
