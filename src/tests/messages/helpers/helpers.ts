import {IMessage} from '../../../models/IMessage';
import {IMessageServerModelResponse} from '../../../models/IMessageServerModelResponse';
import {IMessageServerModel} from '../../../models/IMessageServerModel';

export const deletedMessageIdHelper = '5063cee2-8d66-401d-9345-c422a6361eb6';
export const channelIdHelper = 'adjbf';

export const messageHelper: IMessage = {
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

export const messageServerModelHelper: IMessageServerModel = {
    value: '{"blocks":[{"key":"c6g8c","text":"NeXT ONE","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    customData: {
        upvotes: 4,
        downvotes: 10,
    },
} as IMessageServerModel;

export const messageServerModelResponseHelper: IMessageServerModelResponse = {
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
