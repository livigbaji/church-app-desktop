import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ExternalMemberLabel} from "../types";


@Entity()
export class ExternalMembers {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'first_name'
    })
    firstName!: string;


    @Column({
        nullable: true,
        name: 'middle_name'
    })
    middleName?: string;


    @Column({
        name: 'last_name'
    })
    lastName!: string;


    @Column({
        nullable: true,
    })
    unit?: string;

    @Column({
        enum: ExternalMemberLabel
    })
    label!: ExternalMemberLabel;

    @Column({
        nullable: true,
    })
    deleted?: boolean;

    @Column({
        name: 'deleted_at',
        nullable: true,
    })
    deletedAt?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}