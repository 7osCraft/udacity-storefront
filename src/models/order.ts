import dbClient from "../database";

export type OrderStatus = "ACTIVE" | "COMPLETE";

export type Order = {
  id?: number;
  status: OrderStatus;
  user_id: number;
};

export class OrderStore {
  async index(userId: number): Promise<Order[]> {
    try {
      const connection = await dbClient.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows as Order[];
    } catch (error) {
      throw new Error(`Could not get orders: ${error}`);
    }
  }

  async indexComplete(userId: number): Promise<Order[]> {
    try {
      const connection = await dbClient.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'COMPLETE'";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows as Order[];
    } catch (error) {
      throw new Error(`Could not get completed orders: ${error}`);
    }
  }

  async indexById(orderId: number): Promise<Order | null> {
    try {
      const connection = await dbClient.connect();
      const sql = "SELECT * FROM orders WHERE id = $1";
      const result = await connection.query(sql, [orderId]);
      connection.release();
      if (result.rows.length == 0) {
        return null;
      }
      return result.rows[0] as Order;
    } catch (error) {
      throw new Error(`Could not get completed orders: ${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const connection = await dbClient.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await connection.query(sql, [o.status, o.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create order: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: string
  ): Promise<Order> {
    try {
      const order = await this.indexById(orderId);

      if (!order) {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order doesn't exist`
        );
      }

      if (order.status !== "ACTIVE") {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
