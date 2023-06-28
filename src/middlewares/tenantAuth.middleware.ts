import jwt, { Secret } from "jsonwebtoken";
import { env } from "process";
import { Request, Response, NextFunction } from "express";
import Tenant from "../models/tenant.model";

export const SERVER_JWT_SECRET: Secret = env.SERVER_JWT_SECRET;

export const tenantAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) return res.status(401).send({ message: 'Not found token' });

        const decoded: any = jwt.verify(token, SERVER_JWT_SECRET);

        const tenant: Tenant = await Tenant.findOne({ where: { id: decoded.tenant.id } });

        const hasToken = tenant.tokens.find((t: { token: string }) => t.token === token);

        if (!hasToken || !tenant) throw new Error();

        req.tenant = tenant;
        req.token = token;

        next();

    } catch (err) {
        return res.status(401).send({ message: 'Please authenticate tenant' });
    }
};