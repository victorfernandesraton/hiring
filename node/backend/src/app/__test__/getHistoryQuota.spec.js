import supertest from "supertest";
import app from "../index.js";

describe("historyQuota", () => {
  const agent = supertest.agent(app);

  test("shuld be return valid lastQuota", (done) => {
    agent
      .get("/stock/PETR4.SA/history?from=2017-04-04&to=2017-04-05")
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "PETR4.SA");
        expect(response.body.prices).toBe([
          {
            opening: 14.67,
            low: 14.57,
            high: 14.89,
            closing: 14.85,
            pricedAt: "2017-04-04",
          },
          {
            opening: 15.05,
            low: 14.5,
            high: 15.16,
            closing: 14.57,
            pricedAt: "2017-04-05",
          },
        ]);
        done();
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });

  test("shoud be not found stock", (done) => {
    agent
      .get("/stocks/hsdbshd/history?to=2021-07-03&from=2021-07-01")
      .expect(404)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "stock not found");
        done();
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
