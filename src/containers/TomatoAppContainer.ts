import { connect } from 'react-redux';
import { IState } from '../common/IState';
import {ITomatoAppDispatchProps, ITomatoAppStateProps, TomatoApp} from '../components/TomatoApp';
import {Dispatch} from 'redux';
import {loadUsers} from '../actions/users/loadUsers';
import {loadChannels} from '../actions/channel/loadChannels';
import {loadMessages} from '../actions/message/loadMessages';
import {logout} from '../actions/users/logoutUser';
import {clearErrorMessage} from '../actions/clearErrorMessage';

const mapStateToProps = (state: IState): ITomatoAppStateProps => {
    return {
        userId: state.tomatoApp.userId,
        loggedUser: state.tomatoApp.loggedUser,
        isLoggedIn: state.tomatoApp.userId !== null,
        authToken: state.tomatoApp.authToken,
        isLoading: state.tomatoApp.isLoading,
        errorMessage: state.tomatoApp.errorMessage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ITomatoAppDispatchProps => {
    return {
        loadUsers: (authToken: string | null) => loadUsers(authToken)(dispatch),
        loadChannels: (authToken: string | null) => loadChannels(authToken)(dispatch),
        loadMessages: (authToken: string | null, channelId: Uuid) => loadMessages(authToken, channelId)(dispatch),
        onUserLogout: () => logout(dispatch),
        onClearErrorMessage: () => clearErrorMessage(dispatch),
    };
};

export const TomatoAppContainer = connect<ITomatoAppStateProps>(mapStateToProps, mapDispatchToProps)(TomatoApp);
