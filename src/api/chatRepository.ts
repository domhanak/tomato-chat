import delay from 'delay';
import * as Immutable from 'immutable';
import { IUser } from '../models/IUser';
import { IChannel } from "../models/IChannel";
import { IMessage } from "../models/IMessage";
import { getInitialKnownUsers } from '../common/utils/getInitialUsers';
import { getInitialKnownMessages } from "../common/utils/getInitialMessages";
import { getInitialKnownChannels } from "../common/utils/getInitialChannels";

const userLocalStorageKey = 'tomatoApp.users';
const channelLocalStorageKey = 'tomatoApp.channels';
const messageLocalStorageKey = 'tomatoApp.messages';

const getInitialUsers = (): Immutable.List<IUser> => {
    const itemsInLocalStorage = localStorage.getItem(userLocalStorageKey);

    return !!itemsInLocalStorage
        ? Immutable.List(JSON.parse(itemsInLocalStorage))
        : getInitialKnownUsers();
};

const getInitialChannels = (): Immutable.List<IChannel> => {
    const itemsInLocalStorage = localStorage.getItem(channelLocalStorageKey);

    return !!itemsInLocalStorage
        ? Immutable.List(JSON.parse(itemsInLocalStorage))
        : getInitialKnownChannels();
};

const getInitialMessages = (): Immutable.List<IMessage> => {
    const itemsInLocalStorage = localStorage.getItem(messageLocalStorageKey);

    return !!itemsInLocalStorage
        ? Immutable.List(JSON.parse(itemsInLocalStorage))
        : getInitialKnownMessages();
};

// ==================== Update API ====================

const updateMessages = (messagesToBeSaved: Immutable.List<IMessage>) => {
    messages = messagesToBeSaved;
    localStorage.setItem(messageLocalStorageKey, JSON.stringify(messages.toJS()));
};

let users: Immutable.List<IUser> = getInitialUsers();
let channels: Immutable.List<IChannel> = getInitialChannels();
let messages: Immutable.List<IMessage> = getInitialMessages();


// ===================== API ==========================
export const getUsers = async (): Promise<IUser[]> => {
    await delay(500);

    return users.toArray();
};

export const getChannels = async (): Promise<IChannel[]> => {
    await delay(500);

    return channels.toArray();
};

export const getMessages = async (): Promise<IMessage[]> => {
    await delay(500);

    return messages.toArray();
};

export const updateMessage = async (message: IMessage): Promise<IMessage> => {
    await delay(500);

    const index = messages.findIndex((t: IMessage) => t.id === message.id);
    updateMessages(messages.set(index, message));

    return message;
};

export const createMessage = async (message: IMessage): Promise<IMessage> => {
    await delay(500);

    updateMessages(messages.push(message));

    return message;
};
