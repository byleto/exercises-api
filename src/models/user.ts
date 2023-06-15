import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({
  timestamps: false,
  tableName: 'users_table',
})
export class User_Busuu extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  user_id!: string;
  @Column(DataType.STRING)
  name!: string | '';
  @Column(DataType.STRING)
  username: string | undefined;
  @Column(DataType.STRING)
  password: string | undefined;
}
