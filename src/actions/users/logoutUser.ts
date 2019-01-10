import {
    TOMATO_APP_USER_LOGOUT_FAILED,
    TOMATO_APP_USER_LOGOUT_STARTED,
    TOMATO_APP_USER_LOGOUT_SUCCESS
} from '../../constants/actionTypes';
import {Dispatch} from 'redux';
import {errorMessageUserLogout} from '../../constants/errorMessages';

export const userLogoutStarted = (): Action => ({
    type: TOMATO_APP_USER_LOGOUT_STARTED,
});

export const userLogoutSuccess = (): Action => ({
    type: TOMATO_APP_USER_LOGOUT_SUCCESS,
});

export const userLogoutFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_USER_LOGOUT_FAILED,
    payload: errorMessage
});

const createLogoutFactoryDependencies = {
    userLogoutStarted,
    userLogoutSuccess,
    userLogoutFailed,
};

interface IUserLogoutFactoryDependencies {
    readonly userLogoutStarted: () => Action;
    readonly userLogoutSuccess: () => Action;
    readonly userLogoutFailed: (errorMessage: string | null) => Action;
}

export const createLogoutUserFactory = (dependencies: IUserLogoutFactoryDependencies) => (dispatch: Dispatch): any => {
    try {
        dispatch(dependencies.userLogoutStarted());
        dispatch(dependencies.userLogoutSuccess());
    }
    catch (e) {
        console.log(e);
        dispatch(dependencies.userLogoutFailed(errorMessageUserLogout));
    }
};

export const logout = createLogoutUserFactory(createLogoutFactoryDependencies);
