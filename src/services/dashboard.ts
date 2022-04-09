import dbClient from "../database";

export class DashboardQueries {
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await dbClient.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products and orders: ${err}`);
    }
  }

  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      const conn = await dbClient.connect();
      const sql =
        "SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users with orders: ${err}`);
    }
  }
}
