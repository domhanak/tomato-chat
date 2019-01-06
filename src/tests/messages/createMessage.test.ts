import {
    createMessage, createMessageFailed,
    createMessageStarted,
} from '../../actions/message/createMessage';
import {IMessageServerModel} from "../../models/IMessageServerModel";

test('dispatches actions in correct order - message creation fails', async () => {
    const dispatch = jest.fn();


    const message: IMessageServerModel = {
        value: '',
        customData: {
            downvotes: 0,
            upvotes: 0,
        }
    };

    const dispatchable = createMessage('0', '1', message);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch).toHaveBeenCalledWith(createMessageStarted());
    expect(dispatch).toHaveBeenLastCalledWith(createMessageFailed());
});

/*
test('dispatches actions in correct order - message creation success', async () => {
    const dispatch = jest.fn();


    const message: IMessageServerModel = {
        value: '',
        customData: {
            downvotes: 0,
            upvotes: 0,
        }
    };

    const messageActual: IMessage = {
        id: '0',
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
    };

    const dispatchable = createMessage('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b21hdG9AbWFpbGluYXRvci5jb20iLCJqdGkiOiJjZDFkMTJjMC1kZDhiLTQyNWItYTZkMi1iNTU2M2Q3M2RmNTUiLCJpYXQiOjE1NDY4MDA4NTYsIm5iZiI6MTU0NjgwMDg1NiwiZXhwIjoxNTQ2ODg3MjU2LCJpc3MiOiJQVjI0NyBBUEkiLCJhdWQiOiJQVjI0NyBTdHVkZW50cyJ9.RpweDMO7C_NxNxNThhVODqkUb7nYqRJSWRAi9VH6hUA',
        '304e9c47-5d31-4135-9c71-a2a400f0a3b3', message);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch).toHaveBeenCalledWith(createMessageStarted());
    expect(dispatch).toHaveBeenLastCalledWith(createMessageSuccess(messageActual));
});
*/

/*

    const messageActual: IMessage = {
     id: '0',
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
    };
*/
