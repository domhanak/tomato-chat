import * as Immutable from 'immutable';

export interface IChannelServerModel {
    readonly name: string;
    readonly customData: {
        readonly name: string;
        readonly users: Immutable.List<Uuid>;
        readonly owner: Uuid;
    };
}
