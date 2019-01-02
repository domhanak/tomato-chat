export interface IMessageServerModel {
    readonly value: string;
    readonly customData: {
        upvotes: number;
        downvotes: number;
    }
}
