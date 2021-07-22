import supertest from "supertest";
import app from "../index.js";

describe("GET /stocks/:stock_name/quote", () => {
  test("shuld be return valid lastQuota", async () => {
    const response = await supertest(app).get("/stocks/IBM/quote");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "IBM");
    return;
  });

  test("shoud be not found stock", async () => {
    const response = await supertest(app).get("/stocks/nfdn/quote");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "stock nfdn not found");
    return;
  });
});
