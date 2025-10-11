import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running successfully 🚀" });
});

app.get("/api/v1/hello", (req: Request, res: Response) => {
  res.json({ greeting: "Hello from the Express API!" });
});

app.get("/api/v1/health", (req: Request, res: Response) => {
  const healthInfo = {
    status: "OK",
    uptime: process.uptime(),              
    timestamp: new Date().toISOString(),    
    version: "1.0.0"                        
  };

  res.status(200).json(healthInfo);
});

export default app;
