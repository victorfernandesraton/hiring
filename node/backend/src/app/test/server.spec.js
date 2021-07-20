import supertest from "supertest";
import app from "../index.js";

describe("server", () => {
  const agent = supertest.agent(app);
  test("shoud be alive", (done) => {
    agent
      .get("/helth")
      .expect(200)
      .then((response) => {
        expect(response.body.version).toBe("1.0.0");
        done();
      });
  });
});
