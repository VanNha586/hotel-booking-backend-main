import request from "supertest"

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("/rooms", () => {
  it("/rooms/index", async () => {
    expect(1 + 2).toBe(3);

    const tenant = await request(BASE_URL)
      .get("/rooms");
  });
});