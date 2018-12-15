import axios from 'axios';
import {
    TOMATO_APP_LOADING_USERS_FAILED,
    TOMATO_APP_LOADING_USERS_STARTED,
    TOMATO_APP_LOADING_USERS_SUCCESS
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import {GET_ALL_USERS_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {Dispatch} from 'redux';

const loadingFailed = (): Action => ({
    type: TOMATO_APP_LOADING_USERS_FAILED,
});

const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_USERS_STARTED,
});

const loadingSuccess = (users: ReadonlyArray<IUser>): Action => ({
    type: TOMATO_APP_LOADING_USERS_SUCCESS,
    payload: {
        users,
    }
});

const loadAllUsers = (authToken: string | null) => {
    return axios.get(GET_ALL_USERS_URI, endpointConfigHeader(authToken));
};

const createLoadAllUsersFactoryDependencies = {
    loadingStarted,
    loadingSuccess,
    loadingFailed,
    loadAllUsers
};

interface ILoadAllUsersFactoryDependencies {
    readonly loadingStarted: () => Action;
    readonly loadingSuccess: (users: ReadonlyArray<IUser>) => Action;
    readonly loadingFailed: () => Action;
    readonly loadAllUsers: (authToken: string | null) => any;
}

const createLoadAllUsersFactory = (dependencies: ILoadAllUsersFactoryDependencies) => (authToken: string | null) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());

        return dependencies.loadAllUsers(authToken)
            .then((response: any) => {
                const users: IUser[] = [];
                response.data.forEach((serverData: any) => {
                    users.push(serverData.customData as IUser);
                });

                dispatch(dependencies.loadingSuccess(users));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.loadingFailed());
        });
    };

export const loadUsers = createLoadAllUsersFactory(createLoadAllUsersFactoryDependencies);
