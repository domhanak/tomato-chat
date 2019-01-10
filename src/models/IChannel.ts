import * as Immutable from 'immutable';

export interface IChannel {
    readonly name: string;
    readonly id: Uuid;
    readonly users: Immutable.List<Uuid>;
    readonly owner: Uuid;
}
