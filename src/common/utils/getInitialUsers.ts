import * as uuid from 'uuid';
import * as Immutable from 'immutable';
import { IUser } from '../../models/IUser';
import { List } from 'immutable';
// import { IChannel } from '../../models/IChannel';

export const getInitialKnownUsers = (): Immutable.List<IUser> => Immutable.List([
    { id: uuid(), isLoggedIn: false, nickname: 'Make a coffee', channels: List<Uuid>() },
    { id: uuid(), isLoggedIn: false, nickname: 'Drink it', channels: List<Uuid>() },
    { id: uuid(), isLoggedIn: false, nickname: 'Code all day', channels: List<Uuid>() },
    { id: uuid(), isLoggedIn: false, nickname: 'Sleep', channels: List<Uuid>() },
    { id: uuid(), isLoggedIn: false, nickname: 'Repeat', channels: List<Uuid>() },
]);
