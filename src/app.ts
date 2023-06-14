import express, { Application, Request, Response, NextFunction } from "express";
import { router as userRoutes } from "./routes/user.routes";
import cors from "cors";

const app: Application = express();

app.use(cors({ origin: "*" }));

app.use("/", userRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Hola!." });
});

export default app;
