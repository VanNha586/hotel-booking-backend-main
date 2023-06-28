
import { Table, PrimaryKey, Column, Model, BelongsTo, BelongsToMany } from "sequelize-typescript";
import Admin from "./admin.model";
import Permission from "./permission";
import RolePermission from "./role_permission";
import User from "./user.model";

@Table({
  tableName: "roles",
  timestamps: true,
})
class Role extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  role_name: number;

  @Column
  role_description: string;

  @BelongsToMany(() => Permission, { as: "permissions", through: () => RolePermission })

  public transform(item) {
    return {
      item
    }
  }

  public transformDetails(item) {
    return {
      item
    }
  }

}

export default Role;
