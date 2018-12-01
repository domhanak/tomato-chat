import * as uuid from 'uuid';
import * as Immutable from 'immutable';
import { IUser } from '../../models/IUser';
import { List } from 'immutable';
// import { IChannel } from '../../models/IChannel';

export const getInitialKnownUsers = (): Immutable.List<IUser> => Immutable.List([
    { id: uuid(), nickname: 'Make a coffee', channels: List<Uuid>() },
    { id: uuid(), nickname: 'Drink it', channels: List<Uuid>() },
    { id: uuid(), nickname: 'Code all day', channels: List<Uuid>() },
    { id: uuid(), nickname: 'Sleep', channels: List<Uuid>() },
    { id: uuid(), nickname: 'Repeat', channels: List<Uuid>() },
]);
