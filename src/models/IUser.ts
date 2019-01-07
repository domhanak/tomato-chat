import * as Immutable from 'immutable';

export interface IUser {
    readonly id: string;
    readonly nickname: string;
    readonly email: string;
    readonly selectedChannel: Uuid;
    readonly avatarId: Uuid;
    readonly avatarUrl: string;
    readonly channels: Immutable.List<Uuid>;
}
