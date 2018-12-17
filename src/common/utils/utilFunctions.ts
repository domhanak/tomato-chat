import {IChannelServerModelResponse} from '../../models/IChannelServerModelResponse';
import {IChannel} from '../../models/IChannel';

export const endpointConfigHeader = (authToken?: string | null) => {
    return authToken ?
    {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            charset: 'utf-8',
            authorization: authToken,
        }
    }
:
    {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            charset: 'utf-8',
        }
    };
};

export const responseChannelMapper = (channelResponse: IChannelServerModelResponse) => {
    return {id: channelResponse.id, ...channelResponse.customData} as IChannel;
};

export const storeChannelId = (channelId: Uuid) => {
    localStorage.setItem('channelId', channelId);
};

export const getStoredChannelId = () => {
    return localStorage.getItem('channelId');
};

export const clearStoredChannelId = () => {
    localStorage.removeItem('channelId');
};


export const requestBody = (authToken?: string | null, text?: string) => {
    return {
        headers: {
            accept: 'application/json',
                'Content-Type': 'application/json',
                charset: 'utf-8',
                authorization: authToken,
        },
        body: {
            value: text,
            customDate: {}
        }
    };
};
