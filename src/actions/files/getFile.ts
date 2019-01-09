import { Dispatch } from 'redux';
import {
    TOMATO_APP_GET_FILE_STARTED,
    TOMATO_APP_GET_FILE_FAILED,
    TOMATO_APP_GET_FILE_SUCCESS
} from '../../constants/actionTypes';
import axios from 'axios';
import {GET_FILE_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';
import {IFile} from '../../models/IFile';

export const getFileStarted = (): Action => ({
    type: TOMATO_APP_GET_FILE_STARTED,
});

export const getFileFailed = (): Action => ({
    type: TOMATO_APP_GET_FILE_FAILED,
});

export const getFileSuccess = (file: IFile): Action => ({
    type: TOMATO_APP_GET_FILE_SUCCESS,
    payload: {
        file,
    }
});

const getFileApiCall = (fileId: Uuid, authToken: AuthToken) => {
    return axios.get(GET_FILE_URI(fileId), endpointConfigHeader(authToken));
};

const createGetFileFactoryDependencies = {
    getFileStarted,
    getFileFailed,
    getFileSuccess,
    getFileApiCall
};

interface IGetFileFactoryDependencies {
    readonly getFileStarted: () => Action;
    readonly getFileFailed: () => Action;
    readonly getFileSuccess: (file: IFile) => Action;
    readonly getFileApiCall: (fileId: Uuid, authToken: AuthToken) => any;
}

export const createGetFileFactory = (dependencies: IGetFileFactoryDependencies) =>
    (authToken: AuthToken, fileId: Uuid) =>
        (dispatch: Dispatch) => {
            dispatch(dependencies.getFileStarted());

            return dependencies.getFileApiCall(fileId, authToken)
                .then((response: any) => {
                    dispatch(dependencies.getFileSuccess(response.data as IFile));
                })
                .catch((error: any) => {
                    console.error(error);
                    dispatch(dependencies.getFileFailed());
                });
        };

export const getFile = createGetFileFactory(createGetFileFactoryDependencies);
