import jwt, { Secret } from "jsonwebtoken";
import { env } from "process";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const SERVER_JWT_SECRET: Secret = env.SERVER_JWT_SECRET;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) return res.status(401).send({ message: 'Not found token' });

        const decoded: any = jwt.verify(token, SERVER_JWT_SECRET);

        const user: User = await User.findOne({ where: { id: decoded.user.id } });

        const hasToken = user.tokens.find((t: { token: string }) => t.token === token);

        if (!hasToken || !user) throw new Error();

        req.user = user;
        req.token = token;

        next();

    } catch (err) {
        return res.status(401).send({ message: 'Please authenticate user' });
    }
};