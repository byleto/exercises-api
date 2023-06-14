import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'users',
}) //TODO: Add id as uuid
export class User extends Model {
  @Column(DataType.STRING)
    name!: string | '';
  @Column(DataType.STRING)
  username: string | undefined;
  @Column(DataType.STRING)
  password: string | undefined;
}
