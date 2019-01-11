import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    expectedGetFileStarted, fileHelper,
    fileIdHelper
} from '../helpers/helpers';
import {
    TOMATO_APP_FILE_CREATE_FAILED,
    TOMATO_APP_FILE_CREATE_STARTED,
    TOMATO_APP_FILE_CREATE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    fileCreateStarted,
    fileCreateFailed,
    fileCreateSuccess, createAvatarCreateFactory
} from '../../../actions/files/createFile';
import {expectedUserChannelStarted, userServerModelHelper} from '../../users/helpers/helpers';
import {errorMessageCreateFile} from '../../../constants/errorMessages';

describe('File create thunk action tests.', () => {
    const expectedCreateFileStarted = {type: TOMATO_APP_FILE_CREATE_STARTED};

    const expectedCreateFileSuccess = {type: TOMATO_APP_FILE_CREATE_SUCCESS,
        payload: {
            fileId: fileIdHelper,
        }};

    const expectedCreateFileFailed = {type: TOMATO_APP_FILE_CREATE_FAILED,
        payload: errorMessageCreateFile};

    const fileCreate = (file: File, authToken: AuthToken) => {
        return Promise.resolve({data: [{id: fileIdHelper}]});
    };

    const fileCreateReject = (file: File, authToken: AuthToken) => {
        return Promise.reject({error: {}});
    };

    const createTestCreateFileDependencies = (promise: boolean) => {
        return {
            fileCreateStarted,
            fileCreateFailed,
            fileCreateSuccess,
            fileCreate: promise ? fileCreate : fileCreateReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: createFile.', async done => {
        const dispatch = jest.fn((action) => action);
        await createAvatarCreateFactory(createTestCreateFileDependencies(resolvedPromise))
            (authTokenHelper, fileHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateFileStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedGetFileStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedCreateFileSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: createFile.', async done => {
        const dispatch = jest.fn((action) => action);
        await createAvatarCreateFactory(createTestCreateFileDependencies(rejectedPromise))
        (authTokenHelper, fileHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateFileStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedCreateFileFailed);
        done();
    });
});
