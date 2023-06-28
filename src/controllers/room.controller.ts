
import { Request, Response } from "express";
import { Op } from "sequelize";
import Category from "../models/categories.model";
import File from "../models/file.model";
import Room from "../models/room.model";
import RoomFile from "../models/roomFile.model";
import Tenant from "../models/tenant.model";
import { ApiFeatures } from "../test/apiFeatures";

export default class RoomController {
  async index(req: Request, res: Response) {
    const query = { ...req.query };

    const queryObject = {
      category_id: req.query.category_id,
      city_id: req.query.city_id,
      price: req.query.price,
      size: req.query.size,
    };

    const conditions = {
      status: "ACTIVE"
    };

    const excludedFields = ["page", "page_size", "sort_field", "sort_order", "fields"];
    excludedFields.forEach((field) => delete queryObject[field]);
    const arrQueryObject = Object.entries(queryObject).map((item) => {
      return {
        key: item[0],
        value: item[1],
      };
    });

    for (let index = 0; index < arrQueryObject.length; index++) {
      switch (arrQueryObject[index].key) {
        case "category_id":
          const category_id = typeof arrQueryObject[index].value === "string" ? [arrQueryObject[index].value] : arrQueryObject[index].value;
          if (Array.isArray(category_id)) {
            conditions["category_id"] = {
              [Op.in]: category_id,
            };
          }
          break;

        case "city_id":
          const city_id = typeof arrQueryObject[index].value === "string" ? [arrQueryObject[index].value] : arrQueryObject[index].value;
          if (Array.isArray(city_id)) {
            conditions["city_id"] = {
              [Op.in]: city_id,
            };
          }
          break;

        case "price":
          const price = typeof arrQueryObject[index].value === "string" ? [arrQueryObject[index].value] : arrQueryObject[index].value;
          if (Array.isArray(price)) {
            conditions["price"] = {
              [Op.in]: price,
            };
          }
          break;

        case "size":
          const size = typeof arrQueryObject[index].value === "string" ? [arrQueryObject[index].value] : arrQueryObject[index].value;
          if (Array.isArray(size)) {
            conditions["size"] = {
              [Op.in]: size,
            };
          }
          break;
        default:
          break;
      }
    }

    const objQuery = new ApiFeatures(query)
      .filter(conditions)
      .limitFields()
      .paginate()
      .includes([File])
      .getObjQuery();

    const { count, rows }: any = await Room.findAndCountAll(objQuery);

    const items = rows.map((item) => {
      return item;
    });

    const result = {
      page: Number(query?.page) * 1,
      pageSize: Number(query?.page_size) * 1,
      totalItems: count || 0,
      items: items,
    };

    res.status(200).json(result)
  }

  async create(req: Request, res: Response) {
    try {
      const images = req["files"];
      const reqBody = JSON.parse(req.body.data);

      const room = await Room.create({
        ...reqBody,
        city_id: Number(reqBody.city_id),
        tenant_id: req.tenant.id
      });

      if (images.length) {
        let arrImage = [];
        for await (const image of images) {
          const file = await File.storeMedia(image)
          arrImage = [...arrImage, file];
        }

        for await (const image of arrImage) {
          await RoomFile.create({
            room_id: room.id,
            file_id: image.id,
          });
        }
      }

      const data = await Room.findAll({});
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await Room.findOne({
        where: { id },
        include: [Category, Tenant, File],
      });
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const reqBody = JSON.parse(req.body.data);
      const images = req["files"];
      if (images.length) {
        await RoomFile.destroy({ where: { room_id: reqBody.id } })
        let arrImage = [];
        for await (const image of images) {
          const file = await File.storeMedia(image)
          arrImage = [...arrImage, file];
        }
        for await (const image of arrImage) {
          await RoomFile.create({
            room_id: reqBody.id,
            file_id: image.id,
          });
        }
      }
      const data = await Room.update({ ...reqBody }, { where: { id: reqBody.id } });
      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Room.destroy({
        where: { id },
      });
      const data = await Room.findAll({});
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

}
