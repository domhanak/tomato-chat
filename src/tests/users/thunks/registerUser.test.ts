import {
    userServerModelHelper, userHelper, userServerModelHelperWithUri,
} from '../helpers/helpers';
import {IUserServerModel} from '../../../models/IUserServerModel';
import {
    createRegisterUserFactory,
    registerUserFailed,
    registerUserStarted,
    registerUserSuccess
} from '../../../actions/users/registerUser';
import {
    TOMATO_APP_USER_REGISTER_FAILED,
    TOMATO_APP_USER_REGISTER_STARTED,
    TOMATO_APP_USER_REGISTER_SUCCESS
} from '../../../constants/actionTypes';
import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import { errorMessageUserRegistration} from '../../../constants/errorMessages';

describe('Register user thunk action tests.', () => {
    const userRegistration = (authToken: AuthToken, user: IUserServerModel) => {
        return Promise.resolve({data: userServerModelHelperWithUri});
    };

    const userRegistrationReject = (authToken: AuthToken, user: IUserServerModel) => {
        return Promise.reject({error: {}});
    };

    const expectedUserRegistrationStarted = {type: TOMATO_APP_USER_REGISTER_STARTED};

    const expectedUserRegistrationSuccess = {type: TOMATO_APP_USER_REGISTER_SUCCESS, payload: {user: userHelper}};

    const expectedUserRegistrationFailed = {type: TOMATO_APP_USER_REGISTER_FAILED, payload: errorMessageUserRegistration};

    const createTestUpdateUserDependencies = (promise: boolean) => {
        return {
            registerUserStarted,
            registerUserFailed,
            registerUserSuccess,
            userRegistration: promise ? userRegistration : userRegistrationReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: registerUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createRegisterUserFactory(createTestUpdateUserDependencies(resolvedPromise))
        (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserRegistrationStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserRegistrationSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: registerUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createRegisterUserFactory(createTestUpdateUserDependencies(rejectedPromise))
        (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserRegistrationStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserRegistrationFailed);
        done();
    });
});
