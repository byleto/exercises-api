import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'exercises_table',
})
export class Exercise_Busuu extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  exercise_id!: string;

  @Column(DataType.STRING)
  content: string | undefined;
  @Column(DataType.STRING)
  user_id: string | undefined;
}
