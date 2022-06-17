import {
    Column,
    CreatedAt,
    DataType,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'tb_job',
    timestamps: true,
})
export class Task extends Model {
    @Column({
        type: DataType.TEXT,
        unique: true,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.TEXT,
    })
    task_file: string;

    @Column({
        type: DataType.TEXT,
    })
    task_metadata: string;

    @Column({
        type: DataType.TEXT,
    })
    task_status: string;

    @Column({
        type: DataType.TEXT,
    })
    task_callback: string;

    @Column({
        type: DataType.TEXT,
    })
    task_output: string;

    @Column({
        type: DataType.TEXT,
    })
    task_hash: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}
