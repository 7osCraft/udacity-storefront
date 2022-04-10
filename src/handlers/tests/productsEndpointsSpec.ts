import request from "supertest";
import app from "../../server";

describe("Test products endpoints", () => {
  let productId: number | undefined;
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
  });

  it("should index all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
  });

  it("should index popular products", async () => {
    const response = await request(app).get("/products/popular");
    expect(response.status).toBe(200);
  });

  it("should index products by category", async () => {
    const response = await request(app).get("/products/category/phones");
    expect(response.status).toBe(200);
  });

  it("should create a new product", async () => {
    const response = await request(app)
      .put("/products")
      .send({
        name: "Galaxy S20",
        price: 899,
        category: "Phones",
      })
      .set("Authorization", `Bearer ${token}`);
    productId = response.body.id;
    expect(response.status).toBe(200);
  });

  it("should fail creating a new product", async () => {
    const response = await request(app).put("/products").send({
      name: "Galaxy S22",
      price: 899,
      category: "phones",
    });
    expect(response.status).toBe(401);
  });

  it("should get product by id", async () => {
    const response = await request(app).get(`/products/${productId}`);
    expect(response.status).toBe(200);
  });

  it("should fail getting product by id", async () => {
    const response = await request(app).get("/products/500");
    expect(response.status).toBe(404);
  });

  it("should update product", async () => {
    const response = await request(app)
      .post(`/products/${productId}`)
      .send({
        name: "Galaxy S22",
        price: 1099,
        category: "phones",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should delete product", async () => {
    const response = await request(app)
      .delete(`/products`)
      .send({
        id: productId,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
