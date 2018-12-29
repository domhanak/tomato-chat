export interface IUserServerModel {
    readonly email: string;
    readonly customData: {
        readonly id: string;
        readonly nickname: string;
        readonly selectedChannel: Uuid;
        readonly avatarId: Uuid;
    };
}
