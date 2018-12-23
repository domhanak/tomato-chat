import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {updateUser} from '../../actions/users/updateUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {IProfileStateProps, Profile, IProfileDispatchProps} from '../../components/profile/Profile';
import {createAvatar} from '../../actions/files/createFile';
import {clearStorage, getStoredData} from "../../common/utils/utilFunctions";

const mapStateToProps = (state: IState): IProfileStateProps => {
    return {
        user: state.tomatoApp.loggedUser,
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IProfileDispatchProps => {
    return {
        updateUserProfile: (authToken: AuthToken, user: IUserServerModel, avatar: FileType) => {
            if (avatar !== null) {
                const avatarId = 'avatarId';
                createAvatar(authToken, avatar!)(dispatch);
                user = {email: user.email, customData: {...user.customData, avatarId: getStoredData(avatarId) as string}};
                clearStorage(avatarId);
            }
            updateUser(authToken, user)(dispatch);
        },
    };
};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
