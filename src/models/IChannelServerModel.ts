import * as Immutable from 'immutable';
import {IMessage} from './IMessage';

export interface IChannelServerModel {
    readonly name: string;
    readonly customData: {
        readonly name: string;
        readonly order: number;
        readonly messages: Immutable.List<IMessage>;
        readonly users: Immutable.List<Uuid>;
        readonly owner: Uuid;
    };
}
