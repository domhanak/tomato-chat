import * as Immutable from 'immutable';
import {IChannel} from './IChannel';
import {IMessage} from './IMessage';
import {IUser} from './IUser';

export interface IUsers {
    allUserIds: Immutable.List<Uuid>;
    usersById: Immutable.Map<Uuid, IUser>;
}

export interface IMessages {
    allMessagesByIds: Immutable.List<Uuid>;
    messagesById: Immutable.Map<Uuid, IMessage>;
}

export interface IChannels {
    allChannelIds: Immutable.List<Uuid>;
    channelsById: Immutable.Map<Uuid, IChannel>;
}

export interface ITomatoApp {
  users: IUsers;
  channels: IChannels;
  messages: IMessages;
  userId: Uuid | null;
  loggedUser: IUser | null;
  editedMessageId: Uuid | null;
  editedChannelId: Uuid | null;
  isEditing: boolean;
  isTyping: boolean;
  isLoading: boolean;
  authToken: string | null;
  avatarUri: string | null;
}
