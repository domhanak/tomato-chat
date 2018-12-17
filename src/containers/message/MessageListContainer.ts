import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {IMessageListProps, MessageList} from '../../components/message/MessageList';
import {IState} from '../../common/IState';
import {MessageFilter} from '../../constants/MessageFilter';
import {IMessage} from '../../models/IMessage';


const getMessagesForActiveChannel = createSelector<IState, MessageFilter, Immutable.List<Uuid>, Immutable.Map<Uuid, IMessage>, Immutable.List<Uuid>>(
    [
        state => state.tomatoApp.messageFilter,
        state => state.tomatoApp.messages.allMessagesByIds,
        state => state.tomatoApp.messages.messagesById,
    ],
    (messageFilter, allMessagesByIds, messagesById) => {
        switch (messageFilter) {
            case MessageFilter.All:
                return allMessagesByIds;

            case MessageFilter.Read:
                return allMessagesByIds.filter((id: Uuid) => messagesById.get(id) !== undefined ).toList();

            case MessageFilter.Unread:
                return allMessagesByIds.filter((id: Uuid) => !messagesById.get(id) !== undefined).toList();

            default:
                throw new Error(`Unknown value of visibility filter '${messageFilter}'`);
        }
    });

const mapStateToProps = (state: IState): IMessageListProps => {
    return {
        messageIds: getMessagesForActiveChannel(state),
    };
};

export const MessageListContainer = connect(mapStateToProps)(MessageList);
