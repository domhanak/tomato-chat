import {authTokenHelper, dispatch} from '../../baseHelpers';
import {
    IfileHelper,
    fileIdHelper
} from '../helpers/helpers';
import {
    TOMATO_APP_GET_FILE_STARTED, TOMATO_APP_GET_FILE_SUCCESS,
} from '../../../constants/actionTypes';
import {createGetFileFactory, getFileFailed, getFileStarted, getFileSuccess} from '../../../actions/files/getFile';

describe('File get thunk action tests.', () => {
    const expectedGetFileStarted = {type: TOMATO_APP_GET_FILE_STARTED};

    const expectedGetFileSuccess = {type: TOMATO_APP_GET_FILE_SUCCESS,
        payload: {
            file: IfileHelper,
        }};

    const getFileApiCall = (fileId: Uuid, authToken: AuthToken) => {
        console.log(authToken + fileId);
        return Promise.resolve({data: IfileHelper});
    };

    const createTestGetFileDependencies = {
        getFileStarted,
        getFileFailed,
        getFileSuccess,
        getFileApiCall
    };

    test('Dispatch thunks in correct order: getFile.', async done => {
        await createGetFileFactory(createTestGetFileDependencies)
            (fileIdHelper, authTokenHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedGetFileStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedGetFileSuccess);
        done();
    });
});
