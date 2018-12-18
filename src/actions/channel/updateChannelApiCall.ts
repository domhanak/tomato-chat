import {IChannelServerModel} from '../../models/IChannelServerModel';
import axios from 'axios';
import {GET_CHANNEL_URI} from '../../constants/apiConstants';
import {endpointConfigHeader} from '../../common/utils/utilFunctions';

export const updateChannelApiCall = (authToken: AuthToken, channel: IChannelServerModel, channelId: Uuid) => {
    return axios.put(GET_CHANNEL_URI(channelId), channel, endpointConfigHeader(authToken));
};
