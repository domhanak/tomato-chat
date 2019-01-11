import axios from 'axios';
import {GET_FILE_DOWNLOADLINK_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

export const getDownloadLinkApiCall = (fileId: Uuid, authToken: AuthToken) => {
    return axios.get(GET_FILE_DOWNLOADLINK_URI(fileId), endpointConfigHeader(authToken));
};
