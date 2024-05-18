export class Unit{
    id!: string;

    leader!: string;
    name!: string;
    description!: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}

export class UnitPosition {
    id!: string;

    group!: string;
    name!: string;
    description!: string;
    deleted?: boolean;
    deletedAt?: Date;
    createdAt!: Date;
    updatedAt!: Date;
}