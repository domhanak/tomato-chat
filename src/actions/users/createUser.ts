import { Dispatch } from 'redux';
import * as Immutable from 'immutable';
import { updateUser as updateUserApi} from '../../api/chatRepository';
import {
    TOMATO_APP_USER_REGISTER_STARTED, TOMATO_APP_USER_REGISTER_SUCCESS
} from '../../constants/actionTypes';
import { IUser } from '../../models/IUser';
import * as uuid from 'uuid';

const createUserStarted = (): Action => ({
    type: TOMATO_APP_USER_REGISTER_STARTED,
});

const createUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_REGISTER_SUCCESS,
    payload: {
        user,
    }
});

export const createUser = (nickname: string): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(createUserStarted());

        const user = await updateUserApi({id: uuid(), nickname, channels: Immutable.List<Uuid>(), email: ''});

        dispatch(createUserSuccess(user));
    };
