import { Table, Model, PrimaryKey, Column, BelongsToMany } from "sequelize-typescript";
import Helper from "../utils/Helper";
import Room from "./room.model";
import RoomFile from "./roomFile.model";

@Table({
  tableName: "files",
  timestamps: true,
})
export default class File extends Model<File> {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  filename: string;

  @Column
  disk: string;

  @Column({
    get() {
      return getPath("path", this);
    },
  })
  path: string;

  @Column
  extension: string;

  @Column
  mime: string;

  @Column
  size: number;

  @Column
  width: number;

  @Column
  height: number;

  @BelongsToMany(() => Room, { as: "images", through: () => RoomFile })

  public static async storeMedia(image: any, uploads: string = "uploads", disk: string = "storage") {
    const path = `/${uploads}/${image.filename}`;
    const diskPath = disk;

    const file = {
      filename: image.filename,
      disk: diskPath,
      path,
      extension: "",
      mime: image.mimetype,
      width: 0,
      height: 0,
      size: image.size,
    };

    const data = await File.findOne({ where: { filename: image.filename } });
    if (!data) return await File.create(file);
    if (data) return data;
  }
}

function getPath(path: string, instance: any): string {
  return Helper.staticUrl(instance.getDataValue(path));
}
