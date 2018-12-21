import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {updateUser} from '../../actions/users/updateUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {IProfileStateProps, Profile, IProfileDispatchProps} from '../../components/profile/Profile';

const mapStateToProps = (state: IState): IProfileStateProps => {
    return {
        user: state.tomatoApp.loggedUser,
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IProfileDispatchProps => {
    return {
        updateUserProfile: (authToken: AuthToken, user: IUserServerModel) => updateUser(authToken, user)(dispatch),
    };
};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
