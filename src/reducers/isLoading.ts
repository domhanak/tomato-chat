import { TOMATO_APP_LOADING_STARTED, TOMATO_APP_LOADING_SUCCESS } from '../constants/actionTypes';

export const isLoading = (prevState = false, action: Action): boolean => {
    switch (action.type) {
        case TOMATO_APP_LOADING_STARTED:
            return true;

        case TOMATO_APP_LOADING_SUCCESS:
            return false;

        default:
            return prevState;
    }
};
