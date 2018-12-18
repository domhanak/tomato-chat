import { Dispatch } from 'redux';
import {
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_CHANNELS_STARTED,
    TOMATO_APP_USER_CHANNELS_SUCCESS,
    TOMATO_APP_USER_CHANNELS_FAILED
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import * as Immutable from 'immutable';
import axios from 'axios';
import {GET_USER_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import {loadAllUsers} from './loadUsers';
import {List} from 'immutable';

const updateUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user,
    }
});

const updateUserStarted = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_STARTED,
});

const updateUserFailed = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_FAILED,
});

const updateUsersSuccess = (users: Immutable.List<IUser>): Action => ({
    type: TOMATO_APP_USER_CHANNELS_SUCCESS,
    payload: {
        users,
    }
});


const userUpdate = (authToken: AuthToken, user: IUserServerModel) => {
    return axios.put(GET_USER_URI(user.email), JSON.stringify(user), endpointConfigHeader(authToken));
};

const createUpdateUserFactoryDependencies = {
    updateUserSuccess,
    updateUserStarted,
    updateUsersSuccess,
    userUpdate,
    updateUserFailed,
};

interface IUpdateUserFactoryDependencies {
    readonly updateUserFailed: () => Action;
    readonly updateUserStarted: () => Action;
    readonly updateUsersSuccess: (users: Immutable.List<IUser>) => Action;
    readonly updateUserSuccess: (user: IUser) => Action;
    readonly userUpdate: (authToken: AuthToken, user: IUserServerModel) => any;
}

const createUserUpdateFactory = (dependencies: IUpdateUserFactoryDependencies) =>
    (authToken: AuthToken, user: IUserServerModel) => (dispatch: Dispatch) => {
    dispatch(dependencies.updateUserStarted());
    return userUpdate(authToken, user)
        .then((response: any) => {
            loadAllUsers(authToken)
                .then((responseAllUsers: any) => {
                    let users: List<IUser> = List<IUser>();
                    responseAllUsers.data.forEach((serverData: IUserServerModel) => {
                        users = users.push({email: serverData.email, ...serverData.customData} as IUser);
                    });

                    const responseUser: IUserServerModel = (response.data as IUserServerModel);

                    dispatch(dependencies.updateUsersSuccess(users));
                    dispatch(dependencies.updateUserSuccess({
                        nickname: responseUser.customData.nickname,
                        id: responseUser.customData.id,
                        email: responseUser.email,
                        channels: responseUser.customData.channels} as IUser));
                })
                .catch((error: any) => {
                    console.log(error);
                    dispatch(dependencies.updateUserFailed());
                });
        })
        .catch((error: any) => {
            console.log(error);
            dispatch(dependencies.updateUserFailed());
        });
};

export const updateUser = createUserUpdateFactory(createUpdateUserFactoryDependencies);
