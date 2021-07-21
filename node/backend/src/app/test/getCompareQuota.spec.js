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
    expect(result.body.prices).toHaveLength(2);
    expect(result.body?.prices?.[0]).toHaveProperty("name");
    expect(result.body?.prices?.[0].lastPrice).not.toBe(0);
    expect(result.body?.prices?.[0]).toHaveProperty("priceAt");
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
    expect(result.body?.prices?.[0]).toHaveProperty("name");
    expect(result.body?.prices?.[0].lastPrice).not.toBe(0);
    expect(result.body?.prices?.[0]).toHaveProperty("priceAt");
    return;
  });
});
