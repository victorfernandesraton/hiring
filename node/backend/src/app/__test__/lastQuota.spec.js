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
  test("shuld be return valid lastQuota", function (done) {
    agent.get("/helth").expect(200, done);
  });
});
