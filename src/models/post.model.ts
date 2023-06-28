import { Table, Model } from "sequelize-typescript";

@Table({
  tableName: "posts",
  timestamps: true,
})
export default class Post extends Model {}
