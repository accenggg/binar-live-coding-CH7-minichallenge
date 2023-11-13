const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
  it("get documentation", async () => {
    const response = await request(app).get("/documentation.json");
    expect(response.statusCode).toBe(200);
  });
});
