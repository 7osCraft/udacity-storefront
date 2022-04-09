import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  return res.status(200).json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  return res.status(200).json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);

    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET || "", {
      expiresIn: "3h",
    });

    return res.status(200).json({ ...newUser, token });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await store.authenticate(username, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET || "", {
      expiresIn: "3h",
    });

    return res.status(200).json({ ...user, token });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/{:id}", show);
  app.post("/users", create);
  //app.delete('/users', destroy)
  app.post("/users/authenticate", authenticate);
};

export default routes;
