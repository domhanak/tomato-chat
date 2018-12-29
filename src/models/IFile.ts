export interface IFile {
    readonly id: Uuid;
    readonly name: string;
    readonly extension: string;
    readonly fileSize: number;
    readonly createdBy: string;
}
