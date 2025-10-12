import express, { Request, Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "PiXELL-River Employee & Branch API is running 🚀" });
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
