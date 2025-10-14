"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
class EmployeeService {
    constructor() {
        this.collection = firebaseConfig_1.db.collection("employees");
    }
    async createEmployee(data) {
        const now = new Date().toISOString();
        const docRef = await this.collection.add({
            ...data,
            createdAt: now,
            updatedAt: now,
        });
        const snap = (typeof docRef.get === "function")
            ? await docRef.get()
            : { id: docRef.id, data: () => data };
        return { id: snap.id, ...snap.data() };
    }
    async getAllEmployees() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async getEmployeeById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async updateEmployee(id, updates) {
        const now = new Date().toISOString();
        await this.collection.doc(id).update({ ...updates, updatedAt: now });
        const updatedDoc = await this.collection.doc(id).get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    async deleteEmployee(id) {
        await this.collection.doc(id).delete();
        return { success: true };
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.test.js.map