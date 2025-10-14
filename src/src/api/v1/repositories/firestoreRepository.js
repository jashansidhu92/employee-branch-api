"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreRepository = void 0;
const firebaseConfig_1 = require("../../../../config/firebaseConfig");
class FirestoreRepository {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    col() {
        return firebaseConfig_1.db.collection(this.collectionName);
    }
    async create(data) {
        const now = new Date().toISOString();
        const docRef = await this.col().add({ ...data, createdAt: now, updatedAt: now });
        const snap = await docRef.get();
        return { id: snap.id, ...snap.data() };
    }
    async getAll() {
        const snap = await this.col().get();
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    async getById(id) {
        const doc = await this.col().doc(id).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async update(id, data) {
        const now = new Date().toISOString();
        const ref = this.col().doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            return null;
        await ref.update({ ...data, updatedAt: now });
        const updated = await ref.get();
        return { id: updated.id, ...updated.data() };
    }
    async delete(id) {
        const ref = this.col().doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            return false;
        await ref.delete();
        return true;
    }
    async queryByField(field, value) {
        const snap = await this.col().where(field, "==", value).get();
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
}
exports.FirestoreRepository = FirestoreRepository;
//# sourceMappingURL=firestoreRepository.js.map