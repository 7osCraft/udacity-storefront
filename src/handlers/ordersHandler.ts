import express, { Request, Response } from "express";
import { authTokenValidation } from "../middlewares";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  const orders = await store.index(parseInt(req.params.userId));
  return res.status(200).json(orders);
};

const indexComplete = async (req: Request, res: Response) => {
  const orders = await store.indexComplete(parseInt(req.params.userId));
  return res.status(200).json(orders);
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: parseInt(req.params.userId),
    status: "ACTIVE",
  };
  try {
    const newOrder = await store.create(order);

    return res.status(200).json(newOrder);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const products = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  try {
    const order = await store.addProduct(
      quantity,
      parseInt(req.params.orderId),
      productId
    );

    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const routes = (app: express.Application) => {
  app.get("/orders/:userId", authTokenValidation, index);
  app.get("/orders/:userId/completed", authTokenValidation, indexComplete);
  app.post("/orders/:userId/create", authTokenValidation, create);
  app.post("/orders/:userId/:orderId/products", authTokenValidation, products);
};

export default routes;
