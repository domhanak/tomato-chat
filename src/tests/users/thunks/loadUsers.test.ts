import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    userServerModelHelper,
    userHelper,
    getDownloadLinkApiCallTest,
    userHelper_2,
    userServerModelHelper_2, getDownloadLinkApiCallTestReject,
} from '../helpers/helpers';
import {
    TOMATO_APP_LOADING_USERS_FAILED,
    TOMATO_APP_LOADING_USERS_STARTED,
    TOMATO_APP_LOADING_USERS_SUCCESS,
} from '../../../constants/actionTypes';
import {
    createLoadAllUsersFactory,
    loadingFailed,
    loadingStarted,
    loadingSuccess
} from '../../../actions/users/loadUsers';
import {errorMessageLoadingUsers} from '../../../constants/errorMessages';

describe('Load user thunk action tests.', () => {
    const loadAllUsers = (authToken: AuthToken) => {
        return Promise.resolve({data: [userServerModelHelper, userServerModelHelper_2]});
    };

    const loadAllUsersReject = (authToken: AuthToken) => {
        return Promise.reject({error: {}});
    };

    const expectedUsersLoadStarted = {type: TOMATO_APP_LOADING_USERS_STARTED};
    const expectedUsersLoadSuccess = {type: TOMATO_APP_LOADING_USERS_SUCCESS, payload: {user: userHelper}};
    const expectedUsersLoadSuccess_2 = {type: TOMATO_APP_LOADING_USERS_SUCCESS, payload: {user: userHelper_2}};
    const expectedUsersLoadFailed = {type: TOMATO_APP_LOADING_USERS_FAILED, payload: errorMessageLoadingUsers};

    const createTestLoadUsersDependencies = (promise: boolean, promiseDownloadLink: boolean) => {
        return {
            loadingStarted,
            loadingSuccess,
            loadingFailed,
            loadAllUsers: promise ? loadAllUsers : loadAllUsersReject,
            getDownloadLinkApiCall: promiseDownloadLink ? getDownloadLinkApiCallTest : getDownloadLinkApiCallTestReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: loadUsers.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllUsersFactory(createTestLoadUsersDependencies(resolvedPromise, resolvedPromise))
            (authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUsersLoadStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUsersLoadSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUsersLoadSuccess_2);
        done();
    });

    test('Dispatch thunks in correct order, rejected(loadAllUsersReject): loadUsers.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllUsersFactory(createTestLoadUsersDependencies(rejectedPromise, rejectedPromise))
            (authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUsersLoadStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUsersLoadFailed);
        done();
    });

    test('Dispatch thunks in correct order, rejected(getDownloadLinkApiCallTestReject): loadUsers.', async done => {
        const dispatch = jest.fn((action) => action);
        await createLoadAllUsersFactory(createTestLoadUsersDependencies(resolvedPromise, rejectedPromise))
            (authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUsersLoadStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUsersLoadFailed);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUsersLoadFailed);

        done();
    });
});
