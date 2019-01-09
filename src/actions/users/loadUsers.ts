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

export const loadingFailed = (): Action => ({
    type: TOMATO_APP_LOADING_USERS_FAILED,
});

export const loadingStarted = (): Action => ({
    type: TOMATO_APP_LOADING_USERS_STARTED,
});

export const loadingSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_LOADING_USERS_SUCCESS,
    payload: {
        user,
    }
});

const loadAllUsers = (authToken: AuthToken) => {
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
    readonly loadingSuccess: (user: IUser) => Action;
    readonly loadingFailed: () => Action;
    readonly loadAllUsers: (authToken: string | null) => any;
}

export const createLoadAllUsersFactory = (dependencies: ILoadAllUsersFactoryDependencies) => (authToken: AuthToken) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.loadingStarted());
        // const users: IUser[] = [];
        return dependencies.loadAllUsers(authToken)
            .then((response: any) => {
                response.data.forEach((serverData: IUserServerModel) => {
                    return getDownloadLinkApiCall(serverData.customData.avatarId, authToken)
                            .then((responseDownLink: any) => {
                                dispatch(dependencies.loadingSuccess(({email: serverData.email, ...serverData.customData,
                                    avatarUrl: responseDownLink.data.fileUri} as IUser)));
                            })
                            .catch((error: any) => {
                                console.log(error);
                                dispatch(dependencies.loadingFailed());
                            });
                });


            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.loadingFailed());
        });
    };

export const loadUsers = createLoadAllUsersFactory(createLoadAllUsersFactoryDependencies);
