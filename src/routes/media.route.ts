import { Router } from "express";
import MediaController from "../controllers/media.controller";
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

route.get("/media/index", new MediaController().index);
route.post("/media/store", upload.array("files"), new MediaController().store);
route.delete("/media/delete/:id", new MediaController().delete);

export default route;
