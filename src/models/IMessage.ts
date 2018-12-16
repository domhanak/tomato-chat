export interface IMessage {
    readonly id: string;
    readonly from: Uuid;
    readonly text: string;
}
