import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IProfileStateProps, Profile, IProfileDispatchProps} from '../../components/profile/Profile';
import {createAvatar} from '../../actions/files/createFile';
import {updateUser} from '../../actions/users/updateUser';

const mapStateToProps = (state: IState): IProfileStateProps => {
    return {
        user: state.tomatoApp.loggedUser,
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IProfileDispatchProps => {
    return {
        updateUserProfile: (authToken: AuthToken, user, avatar: FileType) => {
            if (avatar !== null) {
                createAvatar(authToken, avatar!, user)(dispatch);
            }
            updateUser(authToken, user)(dispatch);
        },
    };
};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
