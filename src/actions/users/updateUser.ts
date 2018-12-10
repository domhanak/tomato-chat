import { Dispatch } from 'redux';
import { updateUser as updateUserApi, getUsers as getUsersApi} from '../../api/chatRepository';
import {
    TOMATO_APP_USER_LOGIN_STARTED,
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_CHANNELS_STARTED,
    TOMATO_APP_USER_CHANNELS_SUCCESS
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';
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

const updateUserChannelsStarted = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_STARTED,
});

const updateUserChannelsSuccess = (users: Immutable.List<IUser>): Action => ({
    type: TOMATO_APP_USER_CHANNELS_SUCCESS,
    payload: {
        users,
    }
});

export const logInUser = (id: Uuid): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateUserStarted());

        const loggedUser = getState().tomatoApp.users.usersById.get(id);

        dispatch(updateUserSuccess(loggedUser));
    };


export const updateUserChannels = (id: Uuid, channels: Immutable.List<Uuid>): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateUserChannelsStarted());

        const oldUser = getState().tomatoApp.users.usersById.get(id);
        const user = await updateUserApi({ ...oldUser, channels });

        dispatch(updateUserChannelsSuccess(Immutable.List(await getUsersApi())));
        dispatch(updateUserSuccess(user));
    };
