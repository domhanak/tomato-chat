export interface IUser {
    readonly id: string;
    readonly nickname: string;
    readonly email: string;
    readonly selectedChannel: Uuid;
    readonly avatarId: Uuid;
}
