import supertest from "supertest";
import app from "../../src/app/index.js";

describe("server", () => {
  test("shoud be alive", async () => {
    const response = await supertest(app).get("/helth");

    expect(response.body.version).toBe("1.0.0");
  });
  test("shoud benot found route", async () => {
    const response = await supertest(app).get("/notFound");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Not Found");
  });
});
