import * as Immutable from 'immutable';

export interface IUserServerModel {
    readonly email: string;
    readonly customData: {
        readonly id: string;
        readonly nickname: string;
        readonly channels: Immutable.List<Uuid>;
        readonly selectedChannel: Uuid;
    };
}
