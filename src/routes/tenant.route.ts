import { Router } from "express";
import TenantController from "../controllers/tenant.controller";
import { adminAuth } from "../middlewares/adminAuth.middleware";
import { tenantAuth } from "../middlewares/tenantAuth.middleware";
const route: Router = Router();

route.get("/tenant/index", new TenantController().index);
route.put("/tenant/update", tenantAuth, new TenantController().update);
route.get("/tenant/show/:id", new TenantController().show);
route.post("/tenant/create", adminAuth, new TenantController().create);
route.delete("/tenant/delete/:id", new TenantController().delete);
route.delete("/tenant/delete-room/:roomId",tenantAuth, new TenantController().deleteRoom);
route.post("/tenant/logout", tenantAuth, new TenantController().logout);
route.post("/tenant/login", new TenantController().login);
route.get("/tenant/profile", tenantAuth, new TenantController().profile);
route.get("/tenant/get-rooms", tenantAuth, new TenantController().getRooms);

export default route;
