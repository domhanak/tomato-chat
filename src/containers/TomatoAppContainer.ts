import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../common/IState';
import { loadUsers } from '../actions/loadUsers';
import { ITomatoAppDispatchProps, ITomatoAppStateProps, TomatoApp } from '../components/TomatoApp';
import {loadMessages} from '../actions/loadMessages';
import {loadChannels} from '../actions/loadChannels';

const mapStateToProps = (state: IState) => {
    return {
        loggedUser: state.tomatoApp.loggedUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        loadMessages: () => dispatch(loadMessages()),
        loadChannels: () => dispatch(loadChannels()),
    };
};

export const TomatoAppContainer = connect<ITomatoAppStateProps, ITomatoAppDispatchProps>(mapStateToProps, mapDispatchToProps)(TomatoApp);
