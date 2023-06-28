import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Helper from "../utils/Helper";
import Admin from "../models/admin.model";
import User from "../models/user.model";
export default class AuthController {

  async login(req: Request, res: Response,): Promise<any> {
    try {
      const foundUser = await User.findOne({ where: { username: req.body.username } });

      if (!foundUser) return res.status(500).send("Name of user is not correct");

      const isMatch: boolean = bcrypt.compareSync(req.body.password, foundUser.password);

      if (isMatch) {

        const token = Helper.generateToken(foundUser);

        return res.status(200).json({
          message: "login successfully",
          data: foundUser,
          token: token,
        });
      }

      return res.status(500).send("Password is not correct");

    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async register(req: Request, res: Response): Promise<any> {

    try {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) return res.status(200).json({ message: "User is exit" });

      const hashPassword = await Helper.hashPassword(password);

      const admin = await Admin.findOne();

      const newUser = await User.create({
        username: username,
        admin_id: admin.id,
        password: hashPassword,
      });

      Helper.generateToken(newUser);

      return res.status(200).json({
        message: "Register successfully",
        data: newUser,
      });

    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async logout(req: Request, res: Response): Promise<any> {
    try {
      req.user.tokens = req.user.tokens.filter((item: any) => { return item.token !== req.token; });
      await req.user.save();
      res.status(200).send({ message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
