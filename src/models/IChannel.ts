import * as Immutable from 'immutable';
import {IMessage} from './IMessage';

export interface IChannel {
    readonly name: string;
    readonly id: Uuid;
    readonly order: number;
    readonly messages: Immutable.List<IMessage>;
}
