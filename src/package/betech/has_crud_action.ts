import { Request, Response } from "express";
export default class HasCrudAction {
    index(req: Request, res: Response) {
        return res.json("index");
    }
    create(req: Request, res: Response) {
        return res.json("create");
    }
    update(req: Request, res: Response) {
        return res.json("update");
    }
    delete(req: Request, res: Response) {
        return res.json("delete");
    }
}
