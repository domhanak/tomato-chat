import {List} from 'immutable';

export interface IChannel {
    readonly name: string;
    readonly id: Uuid;
    readonly participants: List<Uuid>;
    readonly attachements: List<Uuid>;
    readonly order: number;
}
