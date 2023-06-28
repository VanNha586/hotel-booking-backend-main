import { Request, Response } from "express";
import File from "../models/file.model";
import Room from "../models/room.model";
import Tenant from "../models/tenant.model";
import AuthController from "./auth.controller";
export default class TenantController extends AuthController {
    async index(req: Request, res: Response) {
        try {
            const data = await Tenant.findAll({});

            return res.status(200).json({ message: "OK", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async login(req: Request, res: Response) {
        return new Tenant().login(req, res);
    }

    async logout(req: Request, res: Response) {
        return new Tenant().logout(req, res);
    }

    async create(req: Request, res: Response) {
        try {
            console.log(req.body);

            await Tenant.create({
                ...req.body
            });

            const data = await Room.findAll({});
            return res.status(200).json({ message: "OK", data: data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const data = await Tenant.findOne({
                where: { id },
            });

            return res.status(200).json({ message: "OK", data: data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async profile(req: Request, res: Response) {
        const { id } = req.tenant;
        try {
            const tenant = await Tenant.findOne({ where: { id } })
            return res.status(200).json({ message: "OK", data: tenant });

        } catch (error) {
            res.status(500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Tenant.destroy({ where: { id } });
            const data = await Tenant.findAll({});
            return res.status(200).json({ message: "OK", data: data });
        } catch (error) {
            res.status(500);
        }
    }

    async deleteRoom(req: Request, res: Response) {

        try {
            const { id } = req.tenant;

            const { roomId } = req.params;

            await Room.update({ tenant_id: null }, {
                where: {
                    id: roomId
                }
            });
            const data = await Tenant.findAll({});
            return res.status(200).json({ message: "OK", data: data });
        } catch (error) {
            res.status(500);
        }
    }

    async getRooms(req: Request, res: Response) {
        const { id } = req.tenant;
        try {
            const rooms = await Room.findAll({
                where: { tenant_id: id },
                include: [
                    {
                        model: File,
                        required: false
                    },
                    {
                        model: Tenant,
                        as: 'tenant',
                        where: { id }
                    }],
            },)
            return res.status(200).json({ message: "OK", data: rooms });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.tenant;
        await Tenant.update({ ...req.body }, { where: { id } })
        const tenant = await Tenant.findOne({ where: { id } })
        return res.status(200).json(tenant);
    }

}
