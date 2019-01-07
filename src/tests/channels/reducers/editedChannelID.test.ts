import {editedChannelId} from "../../../reducers/channel/editedChannelID";
import {

} from "../../../constants/actionTypes";
import {TOMATO_APP_CHANNEL_EDITING_STARTED} from "../../../constants/actionTypes";
import {TOMATO_APP_CHANNEL_EDITING_SUCCESS} from "../../../constants/actionTypes";
import {TOMATO_APP_CHANNEL_EDITING_CANCELLED} from "../../../constants/actionTypes";
import * as Immutable from "immutable";
import {IMessage} from "../../../models/IMessage";
import {IChannel} from "../../../models/IChannel";


const previousStateWithId = '123-456';

const channelInitial = ({
    id: '123-456',
    name: 'tomato',
    owner: '789',
    users: Immutable.List<Uuid>(),
    messages: Immutable.List<IMessage>(),
}) as IChannel;

describe('editedChannelId reducer tests', () => {
    it('should return the initial state', () => {
        expect(editedChannelId(undefined, {type: ''}))
            .toEqual(null)
    });

    it('should return the previous state', () => {
        expect(editedChannelId(null, {type: ''}))
            .toEqual(null)
    });

    it('should handle TOMATO_APP_CHANNEL_EDITING_STARTED', () => {
        const id = previousStateWithId;
        expect(editedChannelId(null, {type: TOMATO_APP_CHANNEL_EDITING_STARTED, payload: {
                id
            }})).toEqual(previousStateWithId)
    });

    it('should handle TOMATO_APP_CHANNEL_EDITING_SUCCESS', () => {
        const channel = channelInitial;
        expect(editedChannelId(previousStateWithId, {type: TOMATO_APP_CHANNEL_EDITING_SUCCESS, payload: {
                channel
            }})).toEqual(previousStateWithId)
    });

    it('should handle TOMATO_APP_CHANNEL_EDITING_CANCELLED', () => {
        const id = previousStateWithId;
        expect(editedChannelId(previousStateWithId, {type: TOMATO_APP_CHANNEL_EDITING_CANCELLED, payload: {
                id
            }})).toEqual(null)
    });
});
