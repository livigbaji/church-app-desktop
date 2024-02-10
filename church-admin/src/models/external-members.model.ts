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


    @Column()
    unit!: string;

    @Column({
        enum: ExternalMemberLabel
    })
    label!: ExternalMemberLabel;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}