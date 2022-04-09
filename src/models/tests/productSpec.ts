import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Test product model", () => {
  let product: Product | undefined;
  it("should create a dummy product", async () => {
    const p = await store.create({
      name: "Dummy Phone",
      category: "Phones",
      price: 599,
    });
    product = p;
    expect(p.name).toEqual("Dummy Phone");
  });

  it("should update product price", async () => {
    const newProduct = await store.update({
      id: product!.id,
      name: product!.name,
      category: product!.category,
      price: 799,
    });
    expect(newProduct.price).toEqual(799);
  });
});
