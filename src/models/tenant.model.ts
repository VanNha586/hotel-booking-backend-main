import { Table, PrimaryKey, Column, Model, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";
import Helper from "../utils/Helper";
import { Request, Response } from "express";

interface typeTokens {
  token: string
}
@Table({
  tableName: "tenants",
  timestamps: true,
})
class Tenant extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: string;

  @Column
  username: string

  @Column
  name: string

  @Column
  phone: number

  @Column
  password: string

  @Column
  address: string

  @Column
  status: string

  @Column({
    type: DataType.JSON,
    get() {
      return this.getDataValue('tokens');
    }
  })
  tokens: Array<typeTokens>;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  async login(req: Request, res: Response,): Promise<any> {
    try {
      const foundTenant = await Tenant.findOne({ where: { username: req.body.username } });

      if (!foundTenant) return res.status(500).send("Name of user is not correct");

      const isMatch: boolean = req.body.password === foundTenant.password;

      if (isMatch) {

        const token = Helper.generateToken(foundTenant, 'tenant');

        return res.status(200).json({
          message: "login successfully",
          data: foundTenant,
          token: token,
        });
      }

      return res.status(500).send("Password is not correct");

    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async logout(req: Request, res: Response): Promise<any> {
    try {
      req.tenant.tokens = req.tenant.tokens.filter((item: any) => { return item.token !== req.token; });
      await req.tenant.save();
      res.status(200).send({ message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}

export default Tenant;
