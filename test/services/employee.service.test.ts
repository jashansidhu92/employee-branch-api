import { db } from "../../src/config/firebaseConfig";

export class EmployeeService {
  private collection = db.collection("employees");

  async createEmployee(data: any) {
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

  async getAllEmployees() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getEmployeeById(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updateEmployee(id: string, updates: any) {
    const now = new Date().toISOString();
    await this.collection.doc(id).update({ ...updates, updatedAt: now });
    const updatedDoc = await this.collection.doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  async deleteEmployee(id: string) {
    await this.collection.doc(id).delete();
    return { success: true };
  }
}
