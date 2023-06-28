import { Router } from "express";
import CategoryController from "../controllers/categories.controller";

const route = Router();

route.get("/categories/index", new CategoryController().index);
route.post("/categories/create", new CategoryController().create);
route.put("/categories/update/:id", new CategoryController().update);
route.delete("/categories/delete/:id", new CategoryController().delete);

export default route;
