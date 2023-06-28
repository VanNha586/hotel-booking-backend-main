import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import Category from "./categories.model";
import File from "./file.model";
import Region from "./regions.model";
import RoomFile from "./roomFile.model";
import Tenant from "./tenant.model";
import User from "./user.model";
import UserRoom from "./userRoom.model";

@Table({
  tableName: "rooms",
  timestamps: true,
})
export default class Room extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column
  category_id: number;

  @ForeignKey(() => Region)
  @Column
  city_id: number;

  @ForeignKey(() => Tenant)
  @Column
  tenant_id: number;

  @Column
  name: string;

  @Column
  lat: number;

  @Column
  lng: number;

  @Column
  slug: string;

  @Column
  star: number;

  @Column
  status: string;

  @Column
  exp_date: Date;

  @Column
  size: number;

  @Column
  info: string;

  @Column
  address: string;

  @Column
  price: number;

  @Column
  phone: number;

  @Column
  image: string;

  @BelongsToMany(() => File, { as: "images", through: () => RoomFile })

  @BelongsToMany(() => User, { as: "users", through: () => UserRoom })

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Tenant)
  tenant: Tenant;

  @BelongsTo(() => Region)
  city: Region;

  public transform(item) {
    return {
      id: item.id,
      room_name: item.name,
      room_price: item.price,
      image: item.image,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }

  public transformDetails(item) {
    return {
      item
    }
  }
}
