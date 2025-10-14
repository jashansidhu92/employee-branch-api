"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const branch_routes_1 = __importDefault(require("./api/v1/routes/branch.routes"));
const employee_routes_1 = __importDefault(require("./api/v1/routes/employee.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/v1/branches", branch_routes_1.default);
app.use("/api/v1/employees", employee_routes_1.default);
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    res.status(err?.status || 500).json({ success: false, error: err?.message || "Internal Server Error" });
});
exports.default = app;
//# sourceMappingURL=app.js.map