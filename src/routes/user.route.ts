import { Router } from "express";
import UserController from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
const route: Router = Router();

route.get("/user/get-users", new UserController().getUsers);
route.get("/user/profile", auth, new UserController().profile);
route.post("/user/login", new UserController().login);
route.put("/user/update", auth, new UserController().update);
route.delete("/user/delete/:id", new UserController().delete);
route.post("/user/register", new UserController().register);
route.get("/user/show/:id", new UserController().show);
route.post("/user/logout", auth, new UserController().logout);
route.post("/user/order", auth, new UserController().order);
route.get("/user/:id/get-user-order", new UserController().getUserOrder);
route.delete("/user/:id/delete-room/:roomId", new UserController().deleteRoom);

export default route;
