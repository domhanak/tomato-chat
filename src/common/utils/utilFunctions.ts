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
            messageUpdate: text
        }
    };
};
