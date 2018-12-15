import { connect } from 'react-redux';
import { IState } from '../common/IState';
import {ITomatoAppStateProps, TomatoApp} from '../components/TomatoApp';

const mapStateToProps = (state: IState): ITomatoAppStateProps => {
    return {
        userId: state.tomatoApp.userId,
        loggedUser: state.tomatoApp.loggedUser,
        isLoggedIn: state.tomatoApp.userId !== null,
        authToken: state.tomatoApp.authToken,
    };
};

export const TomatoAppContainer = connect<ITomatoAppStateProps>(mapStateToProps)(TomatoApp);
