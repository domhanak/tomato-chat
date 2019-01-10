import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    userServerModelHelper,
    userHelper,
    getDownloadLinkApiCallTest,
    userHelper_2,
    userServerModelHelper_2,
} from '../helpers/helpers';
import {
    TOMATO_APP_LOADING_USERS_STARTED,
    TOMATO_APP_LOADING_USERS_SUCCESS,
} from '../../../constants/actionTypes';
import {
    createLoadAllUsersFactory,
    loadingFailed,
    loadingStarted,
    loadingSuccess
} from '../../../actions/users/loadUsers';

describe('Load user thunk action tests.', () => {
    const loadAllUsers = (authToken: AuthToken) => {
        return Promise.resolve({data: [userServerModelHelper, userServerModelHelper_2]});
    };

    const expectedUsersLoadStarted = {type: TOMATO_APP_LOADING_USERS_STARTED};
    const expectedUsersLoadSuccess = {type: TOMATO_APP_LOADING_USERS_SUCCESS, payload: {user: userHelper}};
    const expectedUsersLoadSuccess_2 = {type: TOMATO_APP_LOADING_USERS_SUCCESS, payload: {user: userHelper_2}};

    const createTestLoadUsersDependencies = {
        loadingStarted,
        loadingSuccess,
        loadingFailed,
        loadAllUsers,
        getDownloadLinkApiCall: getDownloadLinkApiCallTest
    };

    test('Dispatch thunks in correct order: loadUsers.', async done => {
        await createLoadAllUsersFactory(createTestLoadUsersDependencies)(authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUsersLoadStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUsersLoadSuccess);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedUsersLoadSuccess_2);
        done();
    });
});
