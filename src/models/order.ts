import Client from "../database";

export type OrderStatus = "ACTIVE" | "COMPLETE";

export type Order = {
  id: number;
  status: OrderStatus;
  userId: number;
};

export class OrderStore {}
