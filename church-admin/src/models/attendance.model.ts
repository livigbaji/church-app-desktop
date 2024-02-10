import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {AttendanceStatus, UserType} from "../types";


@Entity()
export class Attendance {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    user!: string;

    @Column({
        enum: UserType
    })
    userType!: UserType;


    @Column()
    timeIn!: Date;

    @Column()
    timeOut?: Date;

    @Column({
        enum: AttendanceStatus
    })
    status!: AttendanceStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}