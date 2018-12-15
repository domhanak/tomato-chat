import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../common/IState';
import {loadUsers} from '../actions/users/loadUsers';
import {ITomatoAppDispatchProps, ITomatoAppStateProps, TomatoApp} from '../components/TomatoApp';
import {loadMessages} from '../actions/message/loadMessages';
import {loadChannels} from '../actions/channel/loadChannels';

const mapStateToProps = (state: IState): ITomatoAppStateProps => {
    return {
        userId: state.tomatoApp.userId,
        loggedUser: state.tomatoApp.loggedUser,
        isLoggedIn: state.tomatoApp.userId !== null,
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: (authToken: string | null) => loadUsers(authToken)(dispatch),
        loadMessages: () => dispatch(loadMessages()),
        loadChannels: () => dispatch(loadChannels()),
    };
};

export const TomatoAppContainer = connect<ITomatoAppStateProps, ITomatoAppDispatchProps>(mapStateToProps, mapDispatchToProps)(TomatoApp);
