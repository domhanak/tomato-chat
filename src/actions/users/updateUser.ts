import { Dispatch } from 'redux';
import { updateUser as updateUserApi} from '../../api/chatRepository';
import {
    TOMATO_APP_USER_LOGIN_STARTED,
    TOMATO_APP_USER_LOGIN_SUCCESS
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';

const updateUserStarted = (): Action => ({
    type: TOMATO_APP_USER_LOGIN_STARTED,
});

const updateUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user,
    }
});

export const updateUser = (id: Uuid, isLoggedIn: boolean): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateUserStarted());

        const oldUser = getState().tomatoApp.users.usersById.get(id);
        const user = await updateUserApi({ ...oldUser, isLoggedIn });

        dispatch(updateUserSuccess(user));
    };


export const updateUserChannels = (id: Uuid, channels: Immutable.List<IChannel>): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        const oldUser = getState().tomatoApp.users.usersById.get(id);

        dispatch(updateUserStarted());
        const user = await updateUserApi({ ...oldUser, channels });

        dispatch(updateUserSuccess(user));
    };
