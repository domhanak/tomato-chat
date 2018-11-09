import {IChannel} from "./IChannel";
import * as Immutable from 'immutable';

export interface IUser {
    readonly id: string;
    readonly nickname: string;
    readonly isLoggedIn: boolean;
    readonly channels: Immutable.List<IChannel>;
}