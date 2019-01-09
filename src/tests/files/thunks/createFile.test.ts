import {
    authTokenHelper,
    dispatch, expectedGetFileStarted, fileHelper,
    fileIdHelper
} from '../helpers/helpers';
import {
    TOMATO_APP_FILE_CREATE_STARTED,
    TOMATO_APP_FILE_CREATE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    fileCreateStarted,
    fileCreateFailed,
    fileCreateSuccess, createAvatarCreateFactory
} from '../../../actions/files/createFile';
import {expectedUserChannelStarted, userServerModelHelper} from '../../users/helpers/helpers';

describe('File create thunk action tests.', () => {
    const expectedCreateFileStarted = {type: TOMATO_APP_FILE_CREATE_STARTED};

    const expectedCreateFileSuccess = {type: TOMATO_APP_FILE_CREATE_SUCCESS,
        payload: {
            fileId: fileIdHelper,
        }};

    const fileCreate = (file: File, authToken: AuthToken) => {
        console.log(authToken + file.name);
        return Promise.resolve({data: [{id: fileIdHelper}]});
    };

    const createTestCreateFileDependencies = {
        fileCreateStarted,
        fileCreateFailed,
        fileCreateSuccess,
        fileCreate
    };

    test('Dispatch thunks in correct order: createFile.', async done => {
        await createAvatarCreateFactory(createTestCreateFileDependencies)
            (authTokenHelper, fileHelper, userServerModelHelper)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedCreateFileStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedUserChannelStarted);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedGetFileStarted);
        expect(dispatch.mock.calls[3][0]).toEqual(expectedCreateFileSuccess);
        done();
    });
});
