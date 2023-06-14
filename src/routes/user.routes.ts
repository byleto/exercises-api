import { Router, Request, Response } from "express";

const router = Router();

router.get("/users", (req: Request, res: Response): void => {
  const users = ["Byron", "Lenin", "Byleto"];
  res.status(200).send(users);
});

export { router };
