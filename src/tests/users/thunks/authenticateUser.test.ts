import {
    userServerModelHelper,
    getDownloadLinkApiCallTest, expectedLoginSuccess, userHelper, getDownloadLinkApiCallTestReject,
} from '../helpers/helpers';
import {
    createAuthenticationFactory,
    logUserFailed,
    logUserStarted, logUserSuccess,
    userAuthenticateSuccess,
    userAuthenticationFailed,
    userAuthenticationStarted
} from '../../../actions/users/authenticateUser';
import {loadAllChannelsTest, loadAllChannelsTestRejected} from '../../channels/helpers/helpers';
import {
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED, TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGIN_STARTED
} from '../../../constants/actionTypes';
import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {errorMessageUserLogin} from '../../../constants/errorMessages';

describe('Authenticate user thunk action tests.', () => {
    const authenticateUser = (email: String) => {
        return Promise.resolve({data: {token: 'jwtSecret'}});
    };

    const logUser = (email: string, authToken: string) => {
        return Promise.resolve({data: userServerModelHelper});
    };

    const authenticateUserReject = (email: String) => {
        return Promise.reject({error: {}});
    };

    const logUserReject = (email: string, authToken: string) => {
        return Promise.reject({error: {}});
    };

    const expectedUserLoginStarted = {type: TOMATO_APP_USER_LOGIN_STARTED};
    const expectedAuthTokenSuccess = {type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED, payload: {authenticator: authTokenHelper}};
    const expectedAuthTokenStarted = {type: TOMATO_APP_AUTHENTICATION_TOKEN_STARTED};
    const expectedUserLoginFailed = {type: TOMATO_APP_USER_LOGIN_FAILED, payload: errorMessageUserLogin};
    const expectedAuthTokenFailed = {type: TOMATO_APP_AUTHENTICATION_TOKEN_FAILED, payload: errorMessageUserLogin};

    const createTestAuthUserDependencies = (promiseLogUser: boolean, promiseAuthenticate: boolean,
                                            promiseDownloadLink: boolean, promiseLoadAllChannels: boolean) => {
        return {
            authenticationStarted: userAuthenticationStarted,
            authenticateSuccess: userAuthenticateSuccess,
            authenticationFailed: userAuthenticationFailed,
            authenticateUser: promiseAuthenticate ? authenticateUser : authenticateUserReject,
            logUser: promiseLogUser ? logUser : logUserReject,
            logUserStarted,
            logUserSuccess,
            logUserFailed,
            getDownloadLinkApiCall: promiseDownloadLink ? getDownloadLinkApiCallTest : getDownloadLinkApiCallTestReject,
            loadAllChannels: promiseLoadAllChannels ? loadAllChannelsTest : loadAllChannelsTestRejected
        };
    };

    test('Dispatch thunks in correct order, resolved: authenticateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createAuthenticationFactory(createTestAuthUserDependencies(resolvedPromise, resolvedPromise, resolvedPromise, resolvedPromise))
            (userHelper.email)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAuthTokenStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedAuthTokenSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserLoginStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedLoginSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected(promiseLogUser): authenticateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createAuthenticationFactory(createTestAuthUserDependencies(resolvedPromise, rejectedPromise, rejectedPromise, rejectedPromise))
            (userHelper.email)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAuthTokenStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedAuthTokenFailed);
        done();
    });

    test('Dispatch thunks in correct order, rejected(promiseAuthenticate): authenticateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createAuthenticationFactory(createTestAuthUserDependencies(resolvedPromise, resolvedPromise, rejectedPromise, rejectedPromise))
        (userHelper.email)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAuthTokenStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedAuthTokenSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserLoginStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedUserLoginFailed);
        done();
    });

    test('Dispatch thunks in correct order, rejected(promiseDownloadLink): authenticateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createAuthenticationFactory(createTestAuthUserDependencies(resolvedPromise, resolvedPromise, resolvedPromise, rejectedPromise))
        (userHelper.email)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedAuthTokenStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedAuthTokenSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUserLoginStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedUserLoginFailed);
        done();
    });
});
