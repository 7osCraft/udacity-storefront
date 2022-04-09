import dbClient from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  timesOrdered?: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await dbClient.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows as Product[];
    } catch (error) {
      throw new Error(`Could not get products: ${error}`);
    }
  }

  async show(productId: number): Promise<Product | null> {
    try {
      const connection = await dbClient.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const result = await connection.query(sql, [productId]);
      connection.release();
      if (result.rows.length == 0) {
        return null;
      }
      return result.rows[0] as Product;
    } catch (error) {
      throw new Error(`Could not get product with id ${productId}: ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await dbClient.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      connection.release();
      return result.rows[0] as Product;
    } catch (error) {
      throw new Error(`Could not create product: ${error}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const connection = await dbClient.connect();
      const sql =
        "UPDATE products SET (name, price, category, times_ordered) = ($1, $2, $3, $4) WHERE id = $5 RETURNING *";
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.timesOrdered || 0,
        product.id,
      ]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error(`Product not found.`);
      }
      return result.rows[0] as Product;
    } catch (error) {
      throw new Error(`Could not create product: ${error}`);
    }
  }

  async remove(productId: number): Promise<Product> {
    try {
      const connection = await dbClient.connect();
      const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
      const result = await connection.query(sql, [productId]);
      connection.release();
      return result.rows[0] as Product;
    } catch (error) {
      throw new Error(`Could not create product: ${error}`);
    }
  }
}
