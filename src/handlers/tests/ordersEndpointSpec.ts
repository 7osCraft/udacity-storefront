import request from "supertest";
import app from "../../server";

describe("Test orders endpoints", () => {
  let productId: number | undefined;
  let userId: number | undefined;
  let orderId: number | undefined;
  let token: string;

  beforeAll(async () => {
    //Create a dummy user
    const response = await request(app).post("/users").send({
      username: "FooBar",
      firstName: "Foo",
      lastName: "Bar",
      password: "123",
    });
    token = response.body.token;
    userId = response.body.id;

    //Create a random product
    const r = await request(app)
      .put("/products")
      .send({
        name: "Galaxy S20",
        price: 899,
        category: "Phones",
      })
      .set("Authorization", `Bearer ${token}`);
    productId = r.body.id;
  });

  it("should index user orders", async () => {
    const response = await request(app)
      .get(`/orders/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should index user completed orders", async () => {
    const response = await request(app)
      .get(`/orders/${userId}/completed`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should create a new order", async () => {
    const response = await request(app)
      .post(`/orders/${userId}/create`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    orderId = response.body.id;
  });

  it("should add a product to order", async () => {
    const response = await request(app)
      .post(`/orders/${userId}/${orderId}/products`)
      .send({
        productId,
        quantity: 2,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should error adding product to order", async () => {
    const response = await request(app)
      .post(`/orders/${userId}/500/products`)
      .send({
        productId,
        quantity: 2,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it("should list order products", async () => {
    const response = await request(app)
      .get(`/orders/${userId}/${orderId}/products`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
