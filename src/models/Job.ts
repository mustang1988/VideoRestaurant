import {
    Column,
    CreatedAt,
    DataType,
    Model,
    UpdatedAt,
} from 'sequelize-typescript';

export class Job extends Model {
    @Column({
        type: DataType.TEXT,
        primaryKey: true,
        unique: true,
    })
    id: string;

    @Column({
        type: DataType.TEXT,
    })
    job_task_id: string;

    @Column({
        type: DataType.TEXT,
    })
    job_node_id: string;

    @Column({
        type: DataType.TEXT,
    })
    job_status: string;

    @Column({
        type: DataType.NUMBER,
    })
    job_retried: number;

    @Column({
        type: DataType.TEXT,
    })
    job_file: string;

    @Column({
        type: DataType.TEXT,
    })
    job_args: string;

    @Column({
        type: DataType.TEXT,
    })
    job_log: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}
