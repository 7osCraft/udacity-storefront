import request from "supertest";
import app from "../../server";

describe("Test user endpoints", () => {
  let userId: number | undefined;
  let token: string | undefined;

  it("should create a dummy user", async () => {
    const response = await request(app).post("/users").send({
      username: "FooBar",
      firstName: "Foo",
      lastName: "Bar",
      password: "123",
    });
    userId = response.body.id;
    token = response.body.token;
    expect(response.status).toBe(200);
  });

  it("should index all users", async () => {
    const response = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should get a user by id", async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should error getting a user by id", async () => {
    const response = await request(app).get(`/users/500`);
    expect(response.status).toBe(401);
  });

  it("should authenticate user", async () => {
    const response = await request(app).post("/users/authenticate").send({
      username: "FooBar",
      password: "123",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should error authenticating user", async () => {
    const response = await request(app).post("/users/authenticate").send({
      username: "FooBar",
      password: "12345",
    });
    expect(response.status).toBe(401);
  });
});
