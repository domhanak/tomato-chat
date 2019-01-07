import axios from 'axios';
import {
    TOMATO_APP_LOADING_USERS_FAILED,
    TOMATO_APP_LOADING_USERS_STARTED,
    TOMATO_APP_LOADING_USERS_SUCCESS
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import {BASE_USER_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {Dispatch} from 'redux';
import {IUserServerModel} from '../../models/IUserServerModel';
import {getDownloadLinkApiCall} from '../files/getDownloadLink';

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
    return axios.get(BASE_USER_URI, endpointConfigHeader(authToken));
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
        const users: IUser[] = [];
        return dependencies.loadAllUsers(authToken)
            .then((response: any) => {

                response.data.forEach((serverData: IUserServerModel) => {

                    if (serverData.customData.avatarId) {
                        getDownloadLinkApiCall(serverData.customData.avatarId, authToken)
                            .then((responseDownLink: any) => {
                                users.push({email: serverData.email, ...serverData.customData,
                                    avatarUrl: responseDownLink.data.fileUri} as IUser);
                            })
                            .catch((error: any) => {
                                console.log(error);
                                dispatch(dependencies.loadingFailed());
                            });
                    }
                    else {
                        users.push({email: serverData.email, ...serverData.customData,
                            avatarUrl: ''} as IUser);
                    }
                });
            })
            .then((_: any) => {
                console.log(users);
                dispatch(dependencies.loadingSuccess(users));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.loadingFailed());
        });
    };

export const loadUsers = createLoadAllUsersFactory(createLoadAllUsersFactoryDependencies);
