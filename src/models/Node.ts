import {
    Table,
    Model,
    DataType,
    Column,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'tb_node',
})
export class Node extends Model {
    @Column({
        type: DataType.TEXT,
        unique: true,
        primaryKey: true,
    })
    id: string;
    @Column({
        type: DataType.TEXT,
        unique: true,
    })
    node_ip: string;
    @Column({
        type: DataType.TIME,
    })
    node_registed_at: Date;
    @Column({
        type: DataType.TEXT,
    })
    node_status: string;
    @CreatedAt
    created_at: Date;
    @UpdatedAt
    updated_at: Date;
}
