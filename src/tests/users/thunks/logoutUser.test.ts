import {
    TOMATO_APP_USER_LOGOUT_STARTED, TOMATO_APP_USER_LOGOUT_SUCCESS
} from '../../../constants/actionTypes';
import {dispatch} from '../../baseHelpers';
import {
    createLogoutUserFactory,
    userLogoutFailed,
    userLogoutStarted,
    userLogoutSuccess
} from '../../../actions/users/logoutUser';

describe('Update user thunk action tests.', () => {
    const expectedUserLogoutStarted = {type: TOMATO_APP_USER_LOGOUT_STARTED};
    const expectedUserLogoutSuccess = {type: TOMATO_APP_USER_LOGOUT_SUCCESS};

    const createTestLogoutUserDependencies = {
        userLogoutStarted,
        userLogoutSuccess,
        userLogoutFailed,
    };

    test('Dispatch thunks in correct order: logoutUser.', async done => {
        await createLogoutUserFactory(createTestLogoutUserDependencies)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserLogoutStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserLogoutSuccess);
        done();
    });
});
