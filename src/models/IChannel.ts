import * as Immutable from 'immutable';
import {IMessage} from './IMessage';

export interface IChannel {
    readonly name: string;
    readonly id: Uuid;
    readonly messages: Immutable.List<IMessage>;
    readonly users: Immutable.List<Uuid>;
    readonly owner: Uuid;
}
