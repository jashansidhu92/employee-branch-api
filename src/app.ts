import express, { Request, Response } from "express";
import {
  calculatePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  Asset,
} from "./portfolio/portfolioPerformance";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running successfully 🚀" });
});

app.get("/api/v1/health", (req: Request, res: Response) => {
  const healthData = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  res.status(200).json(healthData);
});


app.get("/api/v1/portfolio/performance", (req: Request, res: Response) => {
  const initialInvestment = Number(req.query.initial);
  const currentValue = Number(req.query.current);

  if (isNaN(initialInvestment) || isNaN(currentValue)) {
    return res.status(400).json({ error: "Please provide valid 'initial' and 'current' numeric query parameters." });
  }

  const result = calculatePortfolioPerformance(initialInvestment, currentValue);
  res.status(200).json(result);
});

app.get("/api/v1/portfolio/largest-holding", (req: Request, res: Response) => {
  const queryAssets = req.query.assets as string;

  if (!queryAssets) {
    return res.status(400).json({
      error:
        "Please provide assets as query parameters, e.g. ?assets=Stocks:8000,Bonds:2000",
    });
  }

  const assets = queryAssets.split(",").map((pair) => {
    const [name, value] = pair.split(":");
    return { name, value: Number(value) };
  });

  const result = findLargestHolding(assets);
  res.status(200).json(result);
});


app.get("/api/v1/portfolio/allocation", (req: Request, res: Response) => {
  const queryAssets = req.query.assets as string;

  if (!queryAssets) {
    return res.status(400).json({
      error: "Please provide assets in the query, e.g. ?assets=Stocks:8000,Bonds:2000",
    });
  }

  const assets = queryAssets.split(",").map((pair) => {
    const [name, value] = pair.split(":");
    return { name, value: Number(value) };
  });

  const result = calculateAssetAllocation(assets);
  res.status(200).json(result);
});
export default app;
