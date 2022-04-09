import Client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  timesOrdered: number;
};

export class ProductStore {}
