import { db } from "../../src/config/firebaseConfig";

export class BranchService {
  private collection = db.collection("branches");

  async createBranch(data: any) {
    const now = new Date().toISOString();
    const docRef = await this.collection.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    const snap = (typeof docRef.get === "function")
      ? await docRef.get()
      : { id: docRef.id, data: () => data };

    return { id: snap.id, ...(snap.data() as any) };
  }

  async getAllBranches() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getBranchById(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updateBranch(id: string, updates: any) {
    const now = new Date().toISOString();
    await this.collection.doc(id).update({ ...updates, updatedAt: now });
    const updatedDoc = await this.collection.doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  async deleteBranch(id: string) {
    await this.collection.doc(id).delete();
    return { success: true };
  }
}
