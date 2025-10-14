import { db } from "../../../config/firebaseConfig";


export class FirestoreRepository<T extends { id?: string; createdAt?: string; updatedAt?: string }> {
constructor(private collectionName: string) {}


private col() {
return db.collection(this.collectionName);
}


async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
const now = new Date().toISOString();
const docRef = await this.col().add({ ...data, createdAt: now, updatedAt: now });
const snap = await docRef.get();
return { id: snap.id, ...(snap.data() as T) };
}


async getAll(): Promise<T[]> {
const snap = await this.col().get();
return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}


async getById(id: string): Promise<T | null> {
const doc = await this.col().doc(id).get();
if (!doc.exists) return null;
return { id: doc.id, ...(doc.data() as T) };
}


async update(id: string, data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>): Promise<T | null> {
const now = new Date().toISOString();
const ref = this.col().doc(id);
const doc = await ref.get();
if (!doc.exists) return null;
await ref.update({ ...data, updatedAt: now });
const updated = await ref.get();
return { id: updated.id, ...(updated.data() as T) };
}


async delete(id: string): Promise<boolean> {
const ref = this.col().doc(id);
const doc = await ref.get();
if (!doc.exists) return false;
await ref.delete();
return true;
}


async queryByField<K extends keyof T>(field: K, value: T[K]): Promise<T[]> {
const snap = await this.col().where(field as string, "==", value).get();
return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}
}