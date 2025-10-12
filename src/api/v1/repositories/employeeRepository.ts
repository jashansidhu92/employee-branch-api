import { db } from "../../../../config/firebase";
import { Employee } from "../models/employee";

const collectionRef = db.collection("employees");

export const employeeRepo = {
  async getAll(): Promise<Employee[]> {
    const snapshot = await collectionRef.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Employee[];
  },

  async getById(id: string): Promise<Employee | null> {
    const doc = await collectionRef.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Employee) : null;
  },

  async create(data: Employee): Promise<Employee> {
    const ref = await collectionRef.add(data);
    const doc = await ref.get();
    return { id: doc.id, ...doc.data() } as Employee;
  },

  async update(id: string, data: Partial<Employee>): Promise<Employee | null> {
    const docRef = collectionRef.doc(id);
    await docRef.update(data);
    const updated = await docRef.get();
    return updated.exists ? ({ id: updated.id, ...updated.data() } as Employee) : null;
  },

  async delete(id: string): Promise<boolean> {
    const docRef = collectionRef.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return false;
    await docRef.delete();
    return true;
  },
};
