import {
    TOMATO_APP_MESSAGE_EDITING_CANCELLED,
    TOMATO_APP_MESSAGE_EDITING_STARTED,
    TOMATO_APP_MESSAGE_EDITING_SUCCESS,
    TOMATO_APP_MESSAGE_UPDATE_STARTED
} from "../../../constants/actionTypes";
import {editedMessageId} from "../../../reducers/message/editedMessageId";

const previousStateWithId = '123456';

describe('editedMessageId reducer tests', () => {
    it('should return the initial state', () => {
        expect(editedMessageId(undefined, { type: ''}))
            .toEqual(null)
    });

    it('should return the previous state', () => {
        expect(editedMessageId(null, { type: ''}))
            .toEqual(null)
    });


    it('should handle TOMATO_APP_MESSAGE_EDITING_STARTED', () => {
        const id = previousStateWithId;
        expect(editedMessageId(null, {type: TOMATO_APP_MESSAGE_EDITING_STARTED, payload: {
            id
        }})).toEqual(previousStateWithId)
    });

    it('should handle TOMATO_APP_MESSAGE_EDITING_SUCCESS', () => {
        const id = previousStateWithId;
        expect(editedMessageId(previousStateWithId, {type: TOMATO_APP_MESSAGE_EDITING_SUCCESS, payload: {
                id
            }})).toEqual(previousStateWithId)
    });

    it('should handle TOMATO_APP_MESSAGE_UPDATE_STARTED', () => {
        const id = previousStateWithId;
        expect(editedMessageId(previousStateWithId, {type: TOMATO_APP_MESSAGE_UPDATE_STARTED, payload: {
                id
            }})).toEqual(null)
    });

    it('should handle TOMATO_APP_MESSAGE_EDITING_CANCELLED', () => {
        const id = previousStateWithId;
        expect(editedMessageId(previousStateWithId, {type: TOMATO_APP_MESSAGE_EDITING_CANCELLED, payload: {
                id
            }})).toEqual(null)
    });
});
