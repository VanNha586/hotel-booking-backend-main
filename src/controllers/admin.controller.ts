import Admin from "../models/admin.model";
import { Request, Response } from "express";
import User from "../models/user.model";
import Role from "../models/role.model";
import Permission from "../models/permission";
import Room from "../models/room.model";
import Tenant from "../models/tenant.model";
export default class AdminController {

  async index(req: Request, res: Response) {
    const data = await Admin.findAll({});
    return res.json(data).status(200);
  }

  async getUsers(req: Request, res: Response) {
    const data = await User.findAll({});
    return res.json(data).status(200);
  }

  async getRooms(req: Request, res: Response) {
    const data = await Room.findAll({});
    return res.json(data).status(200);
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await Admin.findOne({
        where: { id }, include: [],
      });

      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response) {
    await Admin.create({ ...req.body })
    const admins = await Admin.findAll({})
    return res.status(200).json(admins);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Admin.destroy({ where: { id } })

    const admins = await Admin.findAll({})
    return res.status(200).json(admins);
  }

  async update(req: Request, res: Response) {
    await Admin.update({ ...req.body }, { where: { id: req.params.id } })
    const admin = await Admin.findAll({})
    return res.status(200).json(admin);
  }

  async login(req: Request, res: Response) {
    return new Admin().login(req, res);
  }

  async logout(req: Request, res: Response) {
    return new Admin().logout(req, res);
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const { id } = req.admin;
      await Admin.update(req.body, { where: { id } });
      const admin = await Admin.findOne({
        where: { id }, include: [{
          model: Role,
          include: [Permission]
        }]
      })
      return res.status(200).json({ message: "OK", data: admin });
    } catch (error) {
      res.status(500);
    }
  }

  async profile(req: Request, res: Response) {
    const { id } = req.admin;
    try {
      const admin = await Admin.findOne({
        where: { id }, include: [{
          model: Role,
          include: [Permission]
        }]
      })
      return res.status(200).json({ message: "OK", data: admin });

    } catch (error) {
      res.status(500);
    }
  }

  async updateStatusRoom(req: Request, res: Response) {
    try {

      const roomId = req.body.id;
      await Room.update({
        status: req.body.status,
      }, { where: { id: roomId } });

      const data = await Room.findAll({});

      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500);
    }
  }

  async updateTenant(req: Request, res: Response) {

    console.log(req.body);

    const { id } = req.params;
    await Tenant.update({ ...req.body }, { where: { id } })
    const tenant = await Tenant.findOne({ where: { id } })
    return res.status(200).json(tenant);
  }
}
