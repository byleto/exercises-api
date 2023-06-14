import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'exercises',
}) //Add id as uuid
export class Exercise extends Model {
  @Column(DataType.STRING)
  content: string | undefined;
  @Column(DataType.INTEGER)
  userId: number | undefined;
}

