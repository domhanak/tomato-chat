import {authTokenHelper, rejectedPromise, resolvedPromise} from '../../baseHelpers';
import {
    IfileHelper,
    fileIdHelper
} from '../helpers/helpers';
import {
    TOMATO_APP_GET_FILE_FAILED,
    TOMATO_APP_GET_FILE_STARTED, TOMATO_APP_GET_FILE_SUCCESS,
} from '../../../constants/actionTypes';
import {createGetFileFactory, getFileFailed, getFileStarted, getFileSuccess} from '../../../actions/files/getFile';
import {errorMessageGetFile} from '../../../constants/errorMessages';

describe('File get thunk action tests.', () => {
    const expectedGetFileStarted = {type: TOMATO_APP_GET_FILE_STARTED};

    const expectedGetFileSuccess = {type: TOMATO_APP_GET_FILE_SUCCESS,
        payload: {
            file: IfileHelper,
        }};

    const expectedGetFileFailed = {type: TOMATO_APP_GET_FILE_FAILED,
        payload: errorMessageGetFile};

    const getFileApiCall = (fileId: Uuid, authToken: AuthToken) => {
        return Promise.resolve({data: IfileHelper});
    };

    const getFileApiCallReject = (fileId: Uuid, authToken: AuthToken) => {
        return Promise.reject({error: {}});
    };

    const createTestGetFileDependencies = (promise: boolean) => {
        return {
            getFileStarted,
            getFileFailed,
            getFileSuccess,
            getFileApiCall: promise ? getFileApiCall : getFileApiCallReject,
        };
    };

    test('Dispatch thunks in correct order, resolved: getFile.', async done => {
        const dispatch = jest.fn((action) => action);
        await createGetFileFactory(createTestGetFileDependencies(resolvedPromise))
            (fileIdHelper, authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedGetFileStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedGetFileSuccess);
        done();
    });

    test('Dispatch thunks in correct order, rejected: getFile.', async done => {
        const dispatch = jest.fn((action) => action);
        await createGetFileFactory(createTestGetFileDependencies(rejectedPromise))
        (fileIdHelper, authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedGetFileStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedGetFileFailed);
        done();
    });
});
