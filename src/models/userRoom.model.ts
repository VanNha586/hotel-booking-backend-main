import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import Room from "./room.model";
import User from "./user.model";

@Table({
  tableName: "user_rooms",
  timestamps: true,
})
export default class UserRoom extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  status: string;

  @ForeignKey(() => Room)
  @Column
  room_id: number;

  @BelongsTo(() => Room)
  room: Room;

  @BelongsTo(() => User)
  user: User;

  public transform(item: UserRoom) {

    return {
      id: item.id,
      room_name: item.room.name,
      room_price: item.room.price,
      image: item.room.image,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }

  public transformDetails(item) {
    return {
      ...item
    }
  }

}
