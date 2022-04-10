import express, { Request, Response } from "express";
import { authTokenValidation } from "../middlewares";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_: Request, res: Response) => {
  const products = await store.index();
  return res.status(200).json(products);
};

const indexPopular = async (_: Request, res: Response) => {
  const products = await store.popular();
  return res.status(200).json(products);
};

const indexCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.indexCategory(req.params.cat);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
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
    id: parseInt(req.params.id),
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

const remove = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    await store.remove(id);

    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/popular", indexPopular);
  app.get("/products/category/:cat", indexCategory);
  app.get("/products/:id", show);
  app.put("/products", authTokenValidation, create);
  app.post("/products/:id", authTokenValidation, update);
  app.delete("/products", authTokenValidation, remove);
};

export default routes;
