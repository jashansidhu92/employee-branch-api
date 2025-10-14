import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import branchRoutes from "./api/v1/routes/branch.routes";
import employeeRoutes from "./api/v1/routes/employee.routes";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.get("/health", (_req, res) => {
res.status(200).json({ status: "ok" });
});


app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/employees", employeeRoutes);


app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
console.error("Unhandled error:", err);
res.status(err?.status || 500).json({ success: false, error: err?.message || "Internal Server Error" });
});


export default app;