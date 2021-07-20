import supertest from "supertest";
import app from "../index.js";

describe("LastQuota", () => {
  const agent = supertest.agent(app);

  test("shuld be return valid lastQuota", (done) => {
    agent
      .get("/stocks/IBM/quote")
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "IBM");
        done();
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });

  test("shoud be not found stock", (done) => {
    agent
      .get("/stocks/nfdn/quote")
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
