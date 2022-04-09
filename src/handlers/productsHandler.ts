import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_: Request, res: Response) => {
  const products = await store.index();
  return res.status(200).json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.body.id);
  return res.status(200).json(product);
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await store.create(product);

    return res.status(200).json(newProduct);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const update = async (req: Request, res: Response) => {
  const product: Product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await store.update(product);

    return res.status(200).json(newProduct);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.put("/products", create);
  app.post("/products", update);
  // app.delete('/products', remove)
};

export default routes;
