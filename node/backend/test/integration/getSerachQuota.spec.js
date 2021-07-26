import supertest from "supertest";
import app from "../../src/app/index.js";

describe("GET /serch", () => {
  test("shoud be find a serachable value", async () => {
    const response = await supertest(app).get("/stocks/search?query=IBM");
    expect(response.status).toBe(200);
    return;
  });
});
