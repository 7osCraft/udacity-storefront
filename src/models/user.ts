import dbClient from "../database";
import bcrypt from "bcrypt";

const pepper = process.env.PEPPER;
const saltRounds = process.env.SALT_ROUNDS || "10";

export type User = {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await dbClient.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows as User[];
    } catch (err) {
      throw new Error(`Unable to get users: ${err}`);
    }
  }

  async show(id: number): Promise<User | null> {
    try {
      const sql = "SELECT * FROM users WHERE id = $1";
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length == 0) {
        return null;
      }

      return result.rows[0] as User;
    } catch (err) {
      throw new Error(`Unable to show user ${id}: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await dbClient.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *";

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.username,
        hash,
      ]);

      conn.release();

      return result.rows[0] as User;
    } catch (err) {
      throw new Error(`Unable to create user (${u.username}): ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await dbClient.connect();
      const sql = "DELETE FROM users WHERE id=($1)";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0] as User;
    } catch (err) {
      throw new Error(`Unable to delete user (${id}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await dbClient.connect();
    const sql = "SELECT password FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + bcrypt, user.password)) {
        return user;
      }
    }

    return null;
  }
}
