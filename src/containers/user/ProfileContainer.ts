import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {updateUser} from '../../actions/users/updateUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {IProfileStateProps, Profile, IProfileDispatchProps} from '../../components/profile/Profile';
import {createFile} from '../../actions/files/createFile';
import {clearStorage, getStoredData} from '../../common/utils/utilFunctions';
import {getDownloadLink} from '../../actions/files/getDownloadLink';
import {getFile} from '../../actions/files/getFile';

const mapStateToProps = (state: IState): IProfileStateProps => {
    return {
        user: state.tomatoApp.loggedUser,
        authToken: state.tomatoApp.authToken,
        avatarUri: state.tomatoApp.avatarUri
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IProfileDispatchProps => {
    return {
        updateUserProfile: (authToken: AuthToken, user: IUserServerModel, avatar: FileType) => {
            let updatedUser: IUserServerModel = user;
            console.log(user);
            if (avatar !== null) {
                const avatarId = 'avatarId';
                createFile(authToken, avatar!, avatarId)(dispatch);
                updatedUser = {email: user.email, customData: {...user.customData, avatarId: getStoredData(avatarId) as string}};
                getDownloadLink(authToken, getStoredData(avatarId) as string)(dispatch);
                clearStorage(avatarId);
            }

            console.log(updatedUser);
            getFile(authToken, updatedUser.customData.avatarId)(dispatch);
            updateUser(authToken, updatedUser)(dispatch);
        },
    };
};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
