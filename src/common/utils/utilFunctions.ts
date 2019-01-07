import {IChannelServerModelResponse} from '../../models/IChannelServerModelResponse';
import {IChannel} from '../../models/IChannel';
// import {IChannelServerModel} from '../../models/IChannelServerModel';
import {IMessage} from '../../models/IMessage';
import {IMessageServerModelResponse} from '../../models/IMessageServerModelResponse';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';

export const endpointConfigHeader = (authToken?: AuthToken) => {
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

export const responseChannelMapper = (channelResponse: IChannelServerModelResponse): IChannel => {
    return {id: channelResponse.id, name: channelResponse.customData.name,
        messages: channelResponse.customData.messages, users: channelResponse.customData.users,
        owner: channelResponse.customData.owner} as IChannel;
};

export const responseMessageMapper = (messageResponse: IMessageServerModelResponse): IMessage => {
    return {
        id: messageResponse.id,
        value: JSON.parse(messageResponse.value),
        createdAt: messageResponse.createdAt,
        createdBy: messageResponse.createdBy,
        updatedAt: messageResponse.updatedAt,
        updatedBy: messageResponse.updatedBy,
        upvotes: messageResponse.customData.upvotes,
        downvotes: messageResponse.customData.downvotes,
    } as IMessage;
};

// export const serverModelChannelMapper = (channel: IChannel) => {
//     return {name: channel.name, customData: {name: channel.name, users: channel.users,
//             messages: channel.messages, owner: channel.owner}} as IChannelServerModel;
// };

export const userToServerModelMapper = (user: IUser): IUserServerModel => {
    return {email: user.email,
        customData: {avatarId: user.avatarId, nickname: user.nickname, selectedChannel: user.selectedChannel,
            id: user.id, channels: user.channels}} as IUserServerModel;
};

export const validateEmail = (email: string): boolean => {
    if (!email) {
        return false;
    }

    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);
};
