import { Request, Response } from "express";
import Room from "../models/room.model";
import Category from "../models/categories.model";
import File from "../models/file.model";
export default class CategoryController {
  async index(req: Request, res: Response) {
    try {
      const data = await Category.findAll({
        include: [File]
      });

      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      await Category.create({
        ...req.body,
      });

      const categories = await Category.findAll({});
      return res.status(200).json({ message: "OK", data: categories });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, body } = req.params;

      await Category.update(
        { body },
        {
          where: { id },
        }
      );

      const categories = await Category.findAll({});
      return res.status(200).json({ message: "OK", data: categories });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Room.destroy({
        where: { id },
      });

      const rooms = await Room.findAll({});
      return res.status(200).json({ message: "OK", data: rooms });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
