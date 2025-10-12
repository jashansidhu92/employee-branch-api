import { db } from "../../../../config/firebase";
import { Employee } from "../models/employee"; 

const collectionName = "employees";

export const getAll = async (): Promise<Employee[]> => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Employee[];
};

export const getById = async (id: string): Promise<Employee | null> => {
  const doc = await db.collection(collectionName).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Employee;
};

export const create = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
  const docRef = await db.collection(collectionName).add(employeeData);
  const newDoc = await docRef.get();
  return { id: newDoc.id, ...newDoc.data() } as Employee;
};

export const update = async (id: string, data: Partial<Employee>): Promise<Employee | null> => {
  const docRef = db.collection(collectionName).doc(id);
  const existing = await docRef.get();
  if (!existing.exists) return null;

  await docRef.update(data);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Employee;
};

export const remove = async (id: string): Promise<boolean> => {
  const docRef = db.collection(collectionName).doc(id);
  const existing = await docRef.get();
  if (!existing.exists) return false;

  await docRef.delete();
  return true;
};
