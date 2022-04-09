import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRoutes from "./handlers/usersHandler";
import productsRoutes from "./handlers/productsHandler";
import ordersRoutes from "./handlers/ordersHandler";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors({ origin: "http://127.0.0.1:3000", optionsSuccessStatus: 200 }));

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
