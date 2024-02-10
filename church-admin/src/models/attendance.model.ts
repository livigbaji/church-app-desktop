import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {AttendanceStatus, UserType} from "../types";


@Entity()
export class Attendance {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'user_id'
    })
    user!: string;

    @Column({
        enum: UserType,
        name: 'user_type'
    })
    userType!: UserType;


    @Column({
        name: 'time_in'
    })
    timeIn!: Date;

    @Column({
        nullable: true,
        name: 'time_out'
    })
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