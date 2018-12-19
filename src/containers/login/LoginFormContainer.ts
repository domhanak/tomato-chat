import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createUser } from '../../actions/users/createUser';
import { IState} from '../../common/IState';
import { IUser} from '../../models/IUser';
import {authenticate} from '../../actions/users/authenticateUser';
import {
    ILoginFormDispatchProps,
    ILoginFormOwnProps,
    LoginForm
} from '../../components/login/LoginForm';

const mapStateToProps = (state: IState): ILoginFormOwnProps => {
    return {
        users: state.tomatoApp.users.usersById.toList(),
        user: state.tomatoApp.users.usersById.find((user: IUser) => (user.id === state.tomatoApp.userId)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ILoginFormDispatchProps => {
    return {
        onUserAdd: (username: string) => dispatch(createUser(username)),
        onUserAuthentication: (email: string) => authenticate(email)(dispatch),
    };
};

export const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
