"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchService = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
class BranchService {
    constructor() {
        this.collection = firebaseConfig_1.db.collection("branches");
    }
    async createBranch(data) {
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
    async getAllBranches() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async getBranchById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async updateBranch(id, updates) {
        const now = new Date().toISOString();
        await this.collection.doc(id).update({ ...updates, updatedAt: now });
        const updatedDoc = await this.collection.doc(id).get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    async deleteBranch(id) {
        await this.collection.doc(id).delete();
        return { success: true };
    }
}
exports.BranchService = BranchService;
//# sourceMappingURL=branch.service.test.js.map