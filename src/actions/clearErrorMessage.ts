import {
    TOMATO_APP_CLEAR_ERROR_MESSAGE_FAILED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS,
} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import {errorMessageClearing} from '../constants/errorMessages';

export const clearErrorStarted = (): Action => ({
    type: TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED,
});

export const clearErrorSuccess = (): Action => ({
    type: TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS,
});

export const clearErrorFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_CLEAR_ERROR_MESSAGE_FAILED,
    payload: errorMessage,
});

const createClearErrorMessageFactoryDependencies = {
    clearErrorStarted,
    clearErrorSuccess,
    clearErrorFailed,
};

interface IClearErrorMessageFactoryDependencies {
    readonly clearErrorStarted: () => Action;
    readonly clearErrorSuccess: () => Action;
    readonly clearErrorFailed: (errorMessage: string | null) => Action;
}

export const createClearErrorMesasgeFactory = (dependencies: IClearErrorMessageFactoryDependencies) => (dispatch: Dispatch): any => {
    try {
        dispatch(dependencies.clearErrorStarted());
        dispatch(dependencies.clearErrorSuccess());
    }
    catch (e) {
        console.log(e);
        dispatch(dependencies.clearErrorFailed(errorMessageClearing));
    }
};

export const clearErrorMessage = createClearErrorMesasgeFactory(createClearErrorMessageFactoryDependencies);
