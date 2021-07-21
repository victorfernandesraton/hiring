import supertest from "supertest";
import app from "../index.js";

describe("getCompareQuota", () => {
  test("should be a valid comparation list", async () => {
    const result = await supertest
      .agent(app)
      .post("/stocks/IBM/compare")
      .send({
        stocks: ["TSCDF"],
      });
    expect(result.status).toBe(200);
    expect(result.body.prices).toContainEqual({
      name: "TSCDF",
      lastPrice: 2.99,
      priceAt: "2021-07-20T00:00:00.000Z",
    });
    return;
  });
  test("should be a valid comparation list and not repeat request", async () => {
    const result = await supertest
      .agent(app)
      .post("/stocks/IBM/compare")
      .send({
        stocks: ["TSCDF", "IBM"],
      });

    expect(result.status).toBe(200);
    expect(result.body.prices).toHaveLength(2);
    expect(result.body.prices).toContainEqual({
      name: "TSCDF",
      lastPrice: 2.99,
      priceAt: "2021-07-20T00:00:00.000Z",
    });
    return;
  });
});
