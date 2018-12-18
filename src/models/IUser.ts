import * as Immutable from 'immutable';

export interface IUser {
    readonly id: string;
    readonly nickname: string;
    readonly email: string;
    readonly channels: Immutable.List<Uuid>;
}
