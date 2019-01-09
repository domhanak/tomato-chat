import {
    authTokenHelper,
    dispatch,
    userServerModelHelper, userHelper, userServerModelHelperWithUri,
} from '../helpers/helpers';
import {IUserServerModel} from '../../../models/IUserServerModel';
import {
    createRegisterUserFactory,
    registerUserFailed,
    registerUserStarted,
    registerUserSuccess
} from '../../../actions/users/registerUser';
import {TOMATO_APP_USER_REGISTER_STARTED, TOMATO_APP_USER_REGISTER_SUCCESS} from '../../../constants/actionTypes';

describe('Update user thunk action tests.', () => {
    const userRegistration = (authToken: AuthToken, user: IUserServerModel) => {
        console.log(authToken + user.email);
        return Promise.resolve({data: userServerModelHelperWithUri});
    };

    const expectedUserRegistrationStarted = {type: TOMATO_APP_USER_REGISTER_STARTED};

    const expectedUserRegistrationSuccess = {type: TOMATO_APP_USER_REGISTER_SUCCESS, payload: {user: userHelper}};

    const createTestUpdateUserDependencies = {
        registerUserStarted,
        registerUserFailed,
        registerUserSuccess,
        userRegistration,
    };

    test('Dispatch thunks in correct order: updateUser.', async done => {
        await createRegisterUserFactory(createTestUpdateUserDependencies)
        (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserRegistrationStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserRegistrationSuccess);
        done();
    });
});
