import {IChannelServerModelResponse} from '../../models/IChannelServerModelResponse';
import {IChannel} from '../../models/IChannel';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {IMessage} from '../../models/IMessage';
import {IMessageServerModelResponse} from '../../models/IMessageServerModelResponse';

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

export const endpointFileConfigHeader = (authToken: AuthToken) => {
    return {
        headers: {
            accept: 'text/plain',
            'Content-Type': 'multipart/form-data',
            authorization: authToken,
        }
    };
};

export const responseChannelMapper = (channelResponse: IChannelServerModelResponse) => {
    return {id: channelResponse.id, ...channelResponse.customData} as IChannel;
};

export const responseMessageMapper = (messageResponse: IMessageServerModelResponse): IMessage => {
    return {
        id: messageResponse.id,
        value: messageResponse.value,
        createdAt: messageResponse.createdAt,
        createdBy: messageResponse.createdBy,
        updatedAt: messageResponse.updatedAt,
        updatedBy: messageResponse.updatedBy,
    } as IMessage;
};

export const serverModelChannelMapper = (channel: IChannel) => {
    return {name: channel.name, customData: {...channel}} as IChannelServerModel;
};

export const storeData = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const getStoredData = (key: string) => {
    return localStorage.getItem(key);
};

export const clearStorage = (key: string) => {
    localStorage.removeItem(key);
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
            messageUpdate: text
        }
    };
};
