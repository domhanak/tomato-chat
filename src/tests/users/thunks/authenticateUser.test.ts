import {
    userServerModelHelper,
    getDownloadLinkApiCallTest, expectedLoginSuccess, userHelper,
} from '../helpers/helpers';
import {
    createAuthenticationFactory,
    logUserFailed,
    logUserStarted, logUserSuccess,
    userAuthenticateSuccess,
    userAuthenticationFailed,
    userAuthenticationStarted
} from '../../../actions/users/authenticateUser';
import {loadAllChannelsTest} from '../../channels/helpers/helpers';
import {
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED,
    TOMATO_APP_USER_LOGIN_STARTED
} from '../../../constants/actionTypes';
import {authTokenHelper, dispatch} from '../../baseHelpers';

describe('Update user thunk action tests.', () => {
    const authenticateUser = (email: String) => {
        console.log(email);
        return Promise.resolve({data: {token: 'jwtSecret'}});
    };

    const logUser = (email: string, authToken: string) => {
        console.log(email + authToken);
        return Promise.resolve({data: userServerModelHelper});
    };

    const expectedUserLoginStarted = {type: TOMATO_APP_USER_LOGIN_STARTED};
    const expectedAuthTokenSuccess = {type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED, payload: {authenticator: authTokenHelper}};
    const expectedAuthTokenStarted = {type: TOMATO_APP_AUTHENTICATION_TOKEN_STARTED};

    const createTestAuthUserDependencies = {
        authenticationStarted: userAuthenticationStarted,
        authenticateSuccess: userAuthenticateSuccess,
        authenticationFailed: userAuthenticationFailed,
        authenticateUser,
        logUser,
        logUserStarted,
        logUserSuccess,
        logUserFailed,
        getDownloadLinkApiCall: getDownloadLinkApiCallTest,
        loadAllChannels: loadAllChannelsTest
    };

    test('Dispatch thunks in correct order: updateUser.', async done => {
        await createAuthenticationFactory(createTestAuthUserDependencies)(userHelper.email)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAuthTokenStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedAuthTokenSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserLoginStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedLoginSuccess);
        done();
    });
});
