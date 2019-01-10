import * as Immutable from 'immutable';

export interface IChannelServerModelResponse {
    readonly id: Uuid;
    readonly name: string;
    readonly customData: {
        readonly name: string;
        readonly users: Immutable.List<Uuid>;
        readonly owner: Uuid;
    };
}
