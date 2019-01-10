import {
    TOMATO_APP_USER_LOGOUT_FAILED,
    TOMATO_APP_USER_LOGOUT_STARTED,
    TOMATO_APP_USER_LOGOUT_SUCCESS
} from '../../constants/actionTypes';
import {Dispatch} from 'redux';

export const userLogoutStarted = (): Action => ({
    type: TOMATO_APP_USER_LOGOUT_STARTED,
});

export const userLogoutSuccess = (): Action => ({
    type: TOMATO_APP_USER_LOGOUT_SUCCESS,
});

export const userLogoutFailed = (): Action => ({
    type: TOMATO_APP_USER_LOGOUT_FAILED,
});

const createLogoutFactoryDependencies = {
    userLogoutStarted,
    userLogoutSuccess,
    userLogoutFailed,
};

interface IUserLogoutFactoryDependencies {
    readonly userLogoutStarted: () => Action;
    readonly userLogoutSuccess: () => Action;
    readonly userLogoutFailed: () => Action;
}

export const createLogoutUserFactory = (dependencies: IUserLogoutFactoryDependencies) => (dispatch: Dispatch): any => {
    try {
        dispatch(dependencies.userLogoutStarted());
        dispatch(dependencies.userLogoutSuccess());
    }
    catch (e) {
        console.log(e);
        dispatch(dependencies.userLogoutFailed());
    }
};

export const logout = createLogoutUserFactory(createLogoutFactoryDependencies);
