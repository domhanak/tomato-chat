import {
    endpointConfigHeader,
    endpointFileConfigHeader,
    responseChannelMapper, responseMessageMapper, userToServerModelMapper,
    validateEmail
} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import {IUser} from '../../models/IUser';
import {IMessage} from '../../models/IMessage';
import {IMessageServerModelResponse} from '../../models/IMessageServerModelResponse';
import {IChannelServerModelResponse} from '../../models/IChannelServerModelResponse';
import {List} from 'immutable';
import {IChannel} from '../../models/IChannel';

const expectedEndpointFileConfigHeader = {
    headers: {
        accept: 'text/plain',
        'Content-Type': 'multipart/form-data',
        authorization: 'Bearer jwtSecret',
    }
};

const expectedEndpointConfigHeaderWithAuthToken = {
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        charset: 'utf-8',
        authorization: 'Bearer jwtSecret',
    }
};

const expectedEndpointConfigHeaderWithoutAuthToken = {
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        charset: 'utf-8',
    }
};

const user: IUser = {
    avatarUrl: '',
    id: 'sd65f4sdf-sdfs',
    avatarId: 'sd46a5-d4as',
    channels: List(['111', '222']),
    email: 'emai@email.com',
    selectedChannel: '222',
    nickname: 'nick',
} as IUser;

const userServerModel: IUserServerModel = {
    email: 'emai@email.com',
    customData: {
        channels: List(['111', '222']),
        id: 'sd65f4sdf-sdfs',
        selectedChannel: '222',
        nickname: 'nick',
        avatarId: 'sd46a5-d4as'
    }
} as IUserServerModel;

const message: IMessage = {
    id: '5063cee2-8d66-401d-9345-c422a6361eb6',
    value: {
        blocks: [
            {
                key: 'c6g8c',
                text: 'NeXT ONE',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {}
            }
        ],
        entityMap: {}
    },
    createdAt: new Date(2018, 12, 5, 11, 30, 20, 5302636),
    createdBy: 'tomato@tomato.com',
    updatedAt: new Date(2019, 1, 6, 12, 39, 22, 4302636),
    updatedBy: 'mailinator@mailinator.com',
    upvotes: 4,
    downvotes: 10
} as IMessage;

const messageServerModelResponse: IMessageServerModelResponse = {
    id: '5063cee2-8d66-401d-9345-c422a6361eb6',
    value: '{\"blocks\":[{\"key\":\"c6g8c\",\"text\":\"NeXT ONE\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}',
    createdAt: new Date(2018, 12, 5, 11, 30, 20, 5302636),
    createdBy: 'tomato@tomato.com',
    updatedAt: new Date(2019, 1, 6, 12, 39, 22, 4302636),
    updatedBy: 'mailinator@mailinator.com',
    customData: {
        upvotes: 4,
        downvotes: 10
    }
} as IMessageServerModelResponse;

const channel: IChannel = {
    id: 'sda56-d6asd',
    owner: 'sdasd-dasd',
    users: List(['sdasd-dasd', 'sad5a-dssd']),
    messages: List<IMessage>(),
    name: 'channel'
} as IChannel;

const channelServerModelResponse: IChannelServerModelResponse = {
    id: 'sda56-d6asd',
    name: 'channel',
    customData: {
        owner: 'sdasd-dasd',
        users: List(['sdasd-dasd', 'sad5a-dssd']),
        messages: List<IMessage>(),
        name: 'channel'
    }
} as IChannelServerModelResponse;

describe('util functions test suite', () => {
    it('validateEmail test success', () => {
        expect(validateEmail('tomato@tomato.com')).toBeTruthy();
    });

    it('validateEmail test empty fail', () => {
        expect(validateEmail('')).toBeFalsy();
    });

    it('validateEmail test invalid - missing domain', () => {
        expect(validateEmail('tomato@.com')).toBeFalsy();
    });

    it('validateEmail test invalid - missing dot', () => {
        expect(validateEmail('tomato@tomatocom')).toBeFalsy();
    });

    it('validateEmail test invalid - missing @', () => {
        expect(validateEmail('tomatotomato.com')).toBeFalsy();
    });

    it('validateEmail test invalid - missing host suffix', () => {
        expect(validateEmail('tomato@tomato')).toBeFalsy();
    });

    it('endpointFileConfigHeader test', () => {
        expect(endpointFileConfigHeader('Bearer jwtSecret'))
            .toEqual(expectedEndpointFileConfigHeader);
    });

    it('EndpointConfigHeader test with authToken', () => {
        expect(endpointConfigHeader('Bearer jwtSecret'))
            .toEqual(expectedEndpointConfigHeaderWithAuthToken);
    });

    it('EndpointConfigHeader test without authToken', () => {
        expect(endpointConfigHeader(null))
            .toEqual(expectedEndpointConfigHeaderWithoutAuthToken);
    });

    it('responseChannelMapper test', () => {
        expect(responseChannelMapper(channelServerModelResponse))
            .toEqual(channel);
    });

    it('responseMessageMapper test', () => {
        expect(responseMessageMapper(messageServerModelResponse))
            .toEqual(message);
    });

    it('userToServerModelMapper test', () => {
        expect(userToServerModelMapper(user))
            .toEqual(userServerModel);
    });
});
