import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Gender, MaritalStatus} from "../types";


@Entity()
export class Member {

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
        enum: MaritalStatus,
        name: 'marital_status'
    })
    maritalStatus!: MaritalStatus;

    @Column({
        enum: Gender,
    })
    gender!: Gender;

    
    @Column({
        nullable: true,
        name: 'home_cell'
    })
    homeCell?: string;

    
    @Column({
        default: Date.now,
        name: 'joined_unit_at'
    })
    joinedUnitAt!: Date;

    
    @Column({
        default: Date.now,
        name: 'joined_commission_at'
    })
    joinedCommissionAt!: Date;

    
    @Column({
        nullable: true,
        name: 'new_birth_at'
    })
    newBirthAt?: Date;

    
    @Column({
        nullable: true,
        name: 'baptized_at'
    })
    baptizedAt?: Date;

    @Column()
    occupation!: string;

    @Column({
        name: 'birth_day'
    })
    birthDay!: number;

    @Column({
        name: 'birth_month'
    })
    birthMonth!: number;

    //TODO should be array
    @Column({
        name: 'phone_number'
    })
    phoneNumber!: string;

    @Column()
    address!: string;

    @Column({
        nullable: true
    })
    reference?: string;

    @Column()
    qualification!: string;

    //TODO should be array
    @Column({
        nullable: true
    })
    otherUnits?: string;


    //TODO should be array
    @Column()
    hobbies!: string;

    
    @Column({
        name: 'next_of_kin_name'
    })
    nextOfKin!: string;

    
    @Column({
        name: 'next_of_kin_number'
    })
    nextOfKinNumber!: string;

    
    @Column()
    village!: string;

    
    @Column({
        name: 'home_town'
    })
    homeTown!: string;

    @Column()
    lga!: string;

    @Column()
    state!: string;


    @Column({
        default: false,
    })
    deleted!: boolean;

    @Column({
        nullable: true,
        name: 'deleted_at'
    })
    deletedAt?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}