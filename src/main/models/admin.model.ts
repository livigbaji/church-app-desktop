export class Admin {
    id!: string;
    user!: string;
    pin!: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}