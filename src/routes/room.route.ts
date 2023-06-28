import { Router } from "express";
import RoomController from "../controllers/room.controller";
import { tenantAuth } from "../middlewares/tenantAuth.middleware";

import fs from "fs";
import path from "path";
const multer = require("multer");

const pathFolder = "./storage/uploads/";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathFolder);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);

        if (!fs.existsSync(path.join(pathFolder, file.originalname))) cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const route = Router();

route.get("/rooms/index", new RoomController().index);
route.post("/rooms/create", upload.array("files"), tenantAuth, new RoomController().create);
route.get("/rooms/show/:id", new RoomController().show);
route.put("/rooms/update/:id", upload.array("files"), tenantAuth, new RoomController().update);
route.delete("/rooms/delete/:id", new RoomController().delete);

export default route;
