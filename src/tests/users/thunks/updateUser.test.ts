import {
    authTokenHelper,
    dispatch, expectedUserChannelStarted, expectedLoginSuccess, userServerModelHelper, userHelper
} from '../helpers/helpers';
import {createUserUpdateFactory, updateUserFailed, updateUserStarted, updateUserSuccess} from '../../../actions/users/updateUser';
import {IUserServerModel} from '../../../models/IUserServerModel';

describe('Update user thunk action tests.', () => {
    const userUpdate = (authToken: AuthToken, user: IUserServerModel) => {
        console.log(authToken + user.email);
        return Promise.resolve({data: userServerModelHelper});
    };

    const getDownloadLinkApiCallTest = (fileId: Uuid, authToken: AuthToken) => {
        console.log(authToken + fileId);
        return Promise.resolve({data: {fileUri: userHelper.avatarUrl}});
    }

    const createTestUpdateUserDependencies = {
        updateUserStarted,
        updateUserFailed,
        updateUserSuccess,
        userUpdate,
        getDownloadLinkApiCall: getDownloadLinkApiCallTest
    };

    test('Dispatch thunks in correct order: updateUser.', async done => {
        await createUserUpdateFactory(createTestUpdateUserDependencies)
            (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoginSuccess);
        done();
    });
});
