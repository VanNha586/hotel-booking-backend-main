import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";

@Table({
  tableName: "banners",
  timestamps: true,
})
export default class Banner extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  status: string;

  @Column
  position: string;

  @Column
  image: string;

}
