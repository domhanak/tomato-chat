import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    expectedUserChannelStarted,
    expectedLoginSuccess,
    userServerModelHelper,
    getDownloadLinkApiCallTest, getDownloadLinkApiCallTestReject,
} from '../helpers/helpers';
import {createUserUpdateFactory, updateUserFailed, updateUserStarted, updateUserSuccess} from '../../../actions/users/updateUser';
import {IUserServerModel} from '../../../models/IUserServerModel';
import {TOMATO_APP_USER_UPDATE_FAILED} from '../../../constants/actionTypes';
import {errorMessageUserUpdate} from '../../../constants/errorMessages';

describe('Update user thunk action tests.', () => {
    const userUpdate = (authToken: AuthToken, user: IUserServerModel) => {
        return Promise.resolve({data: userServerModelHelper});
    };

    const userUpdateReject = (authToken: AuthToken, user: IUserServerModel) => {
        return Promise.reject({error: {}});
    };

    const expectedUserUpdateFailed = {type: TOMATO_APP_USER_UPDATE_FAILED, payload: errorMessageUserUpdate};

    const createTestUpdateUserDependencies = (promise: boolean, promiseDownloadLink: boolean) => {
        return {
            updateUserFailed,
            updateUserSuccess,
            updateUserStarted,
            userUpdate: promise ? userUpdate : userUpdateReject,
            getDownloadLinkApiCall: promiseDownloadLink ? getDownloadLinkApiCallTest : getDownloadLinkApiCallTestReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: updateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUserUpdateFactory(createTestUpdateUserDependencies(resolvedPromise, resolvedPromise))
            (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedLoginSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected(getDownloadLinkApiCallTestReject): updateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUserUpdateFactory(createTestUpdateUserDependencies(rejectedPromise, rejectedPromise))
        (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserUpdateFailed);
        done();
    });

    test('Dispatch thunks in correct order, rejected(userUpdateReject): updateUser.', async done => {
        const dispatch = jest.fn((action) => action);
        await createUserUpdateFactory(createTestUpdateUserDependencies(resolvedPromise, rejectedPromise))
        (authTokenHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserUpdateFailed);
        done();
    });
});
