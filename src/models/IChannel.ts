import * as Immutable from 'immutable';
import {IMessage} from './IMessage';
// import {IUser} from './IUser';

export interface IChannel {
    readonly name: string;
    readonly id: Uuid;
    readonly order: number;
    readonly messages: Immutable.List<IMessage>;
    readonly users: Immutable.List<Uuid>;
    readonly owner: Uuid;
}
