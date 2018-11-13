import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createUser } from '../../actions/users/createUser';
import { updateUser } from '../../actions/users/updateUser';
import { IState} from '../../common/IState';
import { IUser} from '../../models/IUser';
import {
    ILoginFormDispatchProps,
    ILoginFormOwnProps,
    LoginForm
} from '../../components/login/LoginForm';

const mapStateToProps = (state: IState): ILoginFormOwnProps => {
    return {
        users: state.tomatoApp.users.allUsers,
        user: state.tomatoApp.users.allUsers.find((user: IUser) => (user.id === state.tomatoApp.userId)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ILoginFormDispatchProps => {
    return {
        onUserAdd: (username: string) => dispatch(createUser(username)),
        onUserLogin: (id: Uuid, isLoggedIn: boolean) => dispatch(updateUser(id, isLoggedIn))
    };
};

export const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
