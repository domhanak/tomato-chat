import { RawDraftContentState } from 'draft-js';

export interface IMessage {
    readonly id: string;
    readonly value: RawDraftContentState;
    readonly createdBy: Uuid;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly updatedBy: Uuid;
    readonly upvotes: number;
    readonly downvotes: number;
}
