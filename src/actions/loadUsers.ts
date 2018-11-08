import { Dispatch } from 'redux';
import { getUsers } from '../api/chatRepository';
import {TOMATO_APP_LOADING_STARTED, TOMATO_APP_LOADING_SUCCESS} from '../constants/actionTypes';
import {IUser} from "../models/IUser";

const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_STARTED,
});

const loadingSuccess = (users: ReadonlyArray<IUser>): Action => ({
    type: TOMATO_APP_LOADING_SUCCESS,
    payload: {
        users,
    }
});

export const loadUsers = (): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(loadingStarted());
        const users = await getUsers();
        dispatch(loadingSuccess(users));
    };
