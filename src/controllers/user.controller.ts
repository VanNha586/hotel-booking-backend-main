import { Request, Response } from "express";
import Room from "../models/room.model";
import User from "../models/user.model";
import UserRoom from "../models/userRoom.model";

export default class UserController {

  async getUsers(req: Request, res: Response) {
    const data = await User.findAll({});
    return res.json(data).status(200);
  }

  async login(req: Request, res: Response) {
    return new User().login(req, res);
  }

  async update(req: Request, res: Response) {
    await User.update({ ...req.body }, { where: { id: req.user.id } })
    const user = await User.findOne({ where: { id: req.user.id } })
    return res.status(200).json(user);
  }

  async register(req: Request, res: Response) {
    return new User().register(req, res);
  }

  async logout(req: Request, res: Response) {
    return new User().logout(req, res);
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await User.findOne({ where: { id } });

      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      const data = await User.findAll({});
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500);
    }
  }

  async order(req: Request, res: Response) {
    const { id } = req.user;
    const { room_id } = req.body;

    const foundOrder = await UserRoom.findOne({
      where: {
        user_id: id,
        room_id,
      }
    });

    if (foundOrder) return res.status(400).json({ message: "Phòng đã được đặt" });

    try {
      const data = await UserRoom.create({
        user_id: id,
        room_id: room_id
      });
      return res.status(200).json({ message: "Order Success", data: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserOrder(req: Request, res: Response) {

    try {
      const { id } = req.params;

      const order = await User.findOne({
        where: { id },
        include: [Room]
      });

      const data = order['rooms'].map((item) => item.transform(item));


      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500);
    }
  }

  async profile(req: Request, res: Response) {
    const { id } = req.user;
    try {
      const user = await User.findOne({ where: { id } })
      return res.status(200).json({ message: "OK", data: user });
    } catch (error) {
      res.status(500);
    }
  }

  async deleteRoom(req: Request, res: Response) {

    try {
      const { id } = req.params;
      const { roomId } = req.params;

      let userRoom: any = await UserRoom.findOne({
        where: {
          user_id: id, room_id: roomId
        }
      });

      await UserRoom.destroy({
        where: { id: userRoom.id }
      });

      const order = await User.findOne({
        where: { id: id },
        include: [Room]
      })

      const data = order['rooms'].map((item) => item.transform(item));

      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
