import {messages} from "../../../reducers/message/messages";
import * as Immutable from "immutable";
import {IMessage} from "../../../models/IMessage";
import {
    TOMATO_APP_LOADING_MESSAGES_STARTED, TOMATO_APP_LOADING_MESSAGES_SUCCESS,
    TOMATO_APP_MESSAGE_CREATE_SUCCESS,
    TOMATO_APP_MESSAGE_DELETE_SUCCESS, TOMATO_APP_MESSAGE_UPDATE_SUCCESS
} from "../../../constants/actionTypes";


const messageInitial = ({
        id: '123-456',
        value: {
            blocks: [
                {
                    key: '1dl2p',
                    text: '@Potato ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [
                        {
                            offset: 0,
                            length: 7,
                            key: 0
                        }
                    ],
                    data: {}
                }
            ],
            entityMap: {
                '0': {
                    type: 'MENTION',
                    mutability: 'IMMUTABLE',
                    data: {
                        text: '@Potato',
                        value: 'Potato',
                        url: 'Potato'
                    }
                }
            }
        },
        createdBy: 'on@mail.cz',
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: 'on@mail.cz',
        upvotes: 0,
        downvotes: 0,
    }
) as IMessage;

const messageWithOneUpvote = ({
        id: '123-456',
        value: {
            blocks: [
                {
                    key: '1dl2p',
                    text: '@Potato ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [
                        {
                            offset: 0,
                            length: 7,
                            key: 0
                        }
                    ],
                    data: {}
                }
            ],
            entityMap: {
                '0': {
                    type: 'MENTION',
                    mutability: 'IMMUTABLE',
                    data: {
                        text: '@Potato',
                        value: 'Potato',
                        url: 'Potato'
                    }
                }
            }
        },
        createdBy: 'on@mail.cz',
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: 'on@mail.cz',
        upvotes: 1,
        downvotes: 0,
    }
) as IMessage;

const dummyEmptyState = () => ({
    allMessagesByIds: Immutable.List<Uuid>(),
    messagesById: Immutable.Map<Uuid, IMessage>(),
   });

const dummyStateWithOneMessage = () => ({
    allMessagesByIds: Immutable.List<Uuid>(['123-456']),
    messagesById: Immutable.Map<Uuid, IMessage>({'123-456': messageInitial}),
});

const dummyStateWithOneUpdatedMessage = () => ({
    allMessagesByIds: Immutable.List<Uuid>(['123-456']),
    messagesById: Immutable.Map<Uuid, IMessage>({'123-456': messageWithOneUpvote}),
});

const deletedMessageId = '123-456';

describe('messages reducer tests', () => {

    it('should return the initial state', () => {
        expect(messages(undefined, { type: ''}))
            .toEqual(dummyEmptyState())
    });

    it('should return the previous state', () => {
        expect(messages(dummyStateWithOneMessage(), { type: ''}))
            .toEqual(dummyStateWithOneMessage())
    });

    it('should handle TOMATO_APP_LOADING_MESSAGES_STARTED', () => {
        expect(messages({
            allMessagesByIds: Immutable.List<Uuid>(),
            messagesById: Immutable.Map<Uuid, IMessage>(),
        }, {type: TOMATO_APP_LOADING_MESSAGES_STARTED})).toEqual(dummyEmptyState())
    });

    it('should handle TOMATO_APP_MESSAGE_CREATE_SUCCESS', () => {
        const message = messageInitial;
        expect(messages(dummyEmptyState(), { type: TOMATO_APP_MESSAGE_CREATE_SUCCESS, payload: {
                message
            }}))
            .toEqual(dummyStateWithOneMessage())
    });

    it('should handle TOMATO_APP_MESSAGE_DELETE_SUCCESS', () => {
        expect(messages(dummyStateWithOneMessage(), { type: TOMATO_APP_MESSAGE_DELETE_SUCCESS, payload: {
                deletedMessageId
            }}))
            .toEqual(dummyEmptyState())
    });

    it('should handle TOMATO_APP_MESSAGE_UPDATE_SUCCESS', () => {
        const message = messageWithOneUpvote;
        expect(messages(dummyStateWithOneMessage(), { type: TOMATO_APP_MESSAGE_UPDATE_SUCCESS, payload: {
                message
            }}))
            .toEqual(dummyStateWithOneUpdatedMessage())
    });

    it('should handle TOMATO_APP_LOADING_MESSAGES_SUCCESS', () => {
        expect(messages(dummyEmptyState(), { type: TOMATO_APP_LOADING_MESSAGES_SUCCESS, payload: {
                messages : [
                    messageInitial
                ]
            }}))
            .toEqual(dummyStateWithOneMessage())
    });

    it('should handle TOMATO_APP_LOADING_MESSAGES_SUCCESS', () => {
        expect(messages(dummyEmptyState(), { type: TOMATO_APP_LOADING_MESSAGES_SUCCESS, payload: {
                messages : [
                    messageInitial
                ]
            }}))
            .toEqual(dummyStateWithOneMessage())
    });
});
