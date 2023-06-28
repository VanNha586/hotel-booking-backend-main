import { Router } from "express";
import BannerController from "../controllers/banner.controller";
const route: Router = Router();

route.get("/banner/index", new BannerController().index);
route.post("/banner/create", new BannerController().create);
route.post("/banner/update/:id", new BannerController().update);
route.post("/banner/delete/:id", new BannerController().update);

export default route;
