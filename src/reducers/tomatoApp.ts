import { ITomatoApp } from '../models/ITomatoApp';
import { editedMessageId } from './editedMessageId';
import { editedChannelId } from './editedChannelID';
import { loggedUser } from './loggedUser';
import { isEditing } from './isEditing';
import { isTyping } from './isTyping';
import { users } from './users';
import { messageFilter } from './messageFilter';
import { channelFilter } from './channelFilter';
import { channels } from './channels';
import { messages } from './messages';

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
