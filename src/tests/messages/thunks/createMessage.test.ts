import {
    createMessage, createMessageFailed,
    createMessageStarted,
} from '../../../actions/message/createMessage';
import {IMessageServerModel} from "../../../models/IMessageServerModel";

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
