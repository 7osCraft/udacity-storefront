import { Order, OrderStore } from "../order";
import { ProductStore } from "../product";
import { UserStore } from "../user";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe("Test order model", () => {
  let order: Order | undefined;
  let userId: number | undefined;
  let productId: number | undefined;

  beforeAll(async () => {
    const user = await userStore.create({
      first_name: "Foo",
      last_name: "Bar",
      password: "123",
      username: "FooBar1",
    });
    userId = user.id;

    const product = await productStore.create({
      category: "Phones",
      name: "Dummy Phone",
      price: 599,
    });
    productId = product.id;
  });

  it("should create a dummy order", async () => {
    const o = await store.create({
      status: "ACTIVE",
      user_id: userId!,
    });
    order = o;
    expect(o.status).toEqual("ACTIVE");
  });

  it("should add product to order", async () => {
    const newOrder = await store.addProduct(1, order!.id!, productId!);
    expect(newOrder.quantity).toEqual(1);
  });
});
