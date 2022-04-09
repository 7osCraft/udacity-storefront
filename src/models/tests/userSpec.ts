import { UserStore } from "../user";

const store = new UserStore();

describe("Test user model", () => {
  let userId: number | undefined;
  it("should create a dummy user", async () => {
    const user = await store.create({
      first_name: "Foo",
      last_name: "Bar",
      password: "123",
      username: "FooBar1",
    });
    userId = user.id;
    expect(user.username).toEqual("FooBar1");
  });

  it("should authenticate the user", async () => {
    const user = await store.authenticate("FooBar1", "123");
    expect(user?.first_name).toEqual("Foo");
  });

  it("should not authenticate the user", async () => {
    const user = await store.authenticate("FooBar1", "1234");
    expect(user).toBeNull();
  });

  afterAll(async () => {
    if (userId) {
      await store.delete(userId);
    }
  });
});
