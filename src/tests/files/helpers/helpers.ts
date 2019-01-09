import {TOMATO_APP_GET_FILE_STARTED} from '../../../constants/actionTypes';
import {IFile} from '../../../models/IFile';

export const authTokenHelper = 'Bearer jwtSecret';

export const dispatch = jest.fn((action) => action);

export const fileIdHelper = 'sddadas';

export const fileHelper = {} as File;

export const IfileHelper = {id: fileIdHelper, createdBy: 'as6d4as', name: 'file', fileSize: 555, extension: '.jpg'} as IFile;

export const expectedGetFileStarted = {type: TOMATO_APP_GET_FILE_STARTED};
