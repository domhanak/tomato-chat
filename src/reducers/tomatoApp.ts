import { ITomatoApp } from '../models/ITomatoApp';
import { editedMessageId } from './message/editedMessageId';
import { editedChannelId } from './channel/editedChannelID';
import { loggedUser } from './users/loggedUser';
import { isEditing } from './isEditing';
import { isTyping } from './isTyping';
import { users } from './users/users';
import { messageFilter } from './message/messageFilter';
import { channelFilter } from './channel/channelFilter';
import { channels } from './channel/channels';
import { messages } from './message/messages';

export const tomatoApp = (prevState = {} as ITomatoApp, action: Action): ITomatoApp => ({
    users: users(prevState.users, action),
    messages: messages(prevState.messages, action),
    channels: channels(prevState.channels, action),
    editedMessageId: editedMessageId(prevState.editedMessageId, action),
    editedChannelId: editedChannelId(prevState.editedChannelId, action),
    messageFilter: messageFilter(prevState.messageFilter, action),
    channelFilter: channelFilter(prevState.channelFilter, action),
    isEditing: isEditing(prevState.isEditing, action),
    isTyping: isTyping(prevState.isTyping, action),
    loggedUser: loggedUser(prevState.loggedUser, action),
});
