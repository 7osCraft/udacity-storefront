import Client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {}
