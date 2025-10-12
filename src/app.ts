import express, { Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "PiXELL-River Employee & Branch API is running 🚀" });
});

export default app;
