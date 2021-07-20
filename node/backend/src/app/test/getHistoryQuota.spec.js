import supertest from "supertest";
import app from "../index.js";

describe("historyQuota", () => {
  test("shuld be return valid historyQUota", async () => {
    const result = await supertest(app).get(
      "/stocks/IBM/history?from=2017-04-04&to=2017-04-05"
    );
    expect(result.status).toBe(200);
    return;
  });

  test("shoud be not found stock", async () => {
    const result = await supertest(app).get(
      "/stocks/edede/history?to=2021-07-03&from=2021-07-01"
    );

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("stock not found");
    return;
  });
});
