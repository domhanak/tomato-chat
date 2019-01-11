import { Dispatch } from 'redux';
import {
    TOMATO_APP_FILE_CREATE_STARTED,
    TOMATO_APP_FILE_CREATE_FAILED,
    TOMATO_APP_FILE_CREATE_SUCCESS
} from '../../constants/actionTypes';
import axios from 'axios';
import {BASE_FILE_URI} from '../../constants/apiConstants';
import {endpointFileConfigHeader} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import {getFile} from './getFile';
import {updateUser} from '../users/updateUser';
import {errorMessageCreateFile} from '../../constants/errorMessages';

export const fileCreateStarted = (): Action => ({
    type: TOMATO_APP_FILE_CREATE_STARTED,
});

export const fileCreateFailed = (errorMessage: string | null): Action => ({
    type: TOMATO_APP_FILE_CREATE_FAILED,
    payload: errorMessage
});

export const fileCreateSuccess = (fileId: Uuid): Action => ({
    type: TOMATO_APP_FILE_CREATE_SUCCESS,
    payload: {
        fileId,
    }
});

const fileCreate = (file: File, authToken: AuthToken) => {
    const formData = new FormData();
    formData.append('Files', file);
    formData.append('type', file.type);
    return axios.post(BASE_FILE_URI, formData, endpointFileConfigHeader(authToken));
};

const createChannelCreateFactoryDependencies = {
    fileCreateStarted,
    fileCreateFailed,
    fileCreateSuccess,
    fileCreate
};

interface ICreateFileFactoryDependencies {
    readonly fileCreateStarted: () => Action;
    readonly fileCreateFailed: (errorMessage: string | null) => Action;
    readonly fileCreateSuccess: (fileId: Uuid) => Action;
    readonly fileCreate: (file: File, authToken: AuthToken) => any;
}

export const createAvatarCreateFactory = (dependencies: ICreateFileFactoryDependencies) => (authToken: AuthToken, file: File, user: IUserServerModel) =>
    (dispatch: Dispatch): any => {
        dispatch(dependencies.fileCreateStarted());

        return dependencies.fileCreate(file, authToken)
            .then((response: any) => {
                // storeData(appFileType, response.data[0].id);
                const avatarId = response.data[0].id;

                const updatedUser = {email: user.email, customData: {...user.customData, avatarId}};

                updateUser(authToken, updatedUser)(dispatch);
                getFile(authToken, updatedUser.customData.avatarId)(dispatch);

                dispatch(dependencies.fileCreateSuccess(response.data[0].id as Uuid));
            })
            .catch((error: any) => {
                console.log(error);
                dispatch(dependencies.fileCreateFailed(errorMessageCreateFile));
            });
    };

export const createAvatar = createAvatarCreateFactory(createChannelCreateFactoryDependencies);
