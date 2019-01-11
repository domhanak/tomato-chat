import {dispatch} from '../../baseHelpers';
import {
    TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED, TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS,
} from '../../../constants/actionTypes';
import {
    clearErrorFailed,
    clearErrorStarted,
    clearErrorSuccess,
    createClearErrorMesasgeFactory
} from '../../../actions/clearErrorMessage';

describe('Clear error message thunk action tests.', () => {
    const expectedClearErrorMessagesStarted = {type: TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED};
    const expectedClearErrorMessagesSuccess = {type: TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS}

    const createTestClearErrorMesasgeDependencies = {
        clearErrorStarted,
        clearErrorSuccess,
        clearErrorFailed,
    };

    test('Dispatch thunks in correct order: clearErrorMessage.', async done => {
        await createClearErrorMesasgeFactory(createTestClearErrorMesasgeDependencies)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(expectedClearErrorMessagesStarted);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedClearErrorMessagesSuccess);
        done();
    });
});
