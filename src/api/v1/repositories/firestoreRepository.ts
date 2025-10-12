import { db } from "../../../../config/firebase";

export class FirestoreRepository<T extends { [key: string]: any }> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async createDocument(data: T): Promise<T & { id: string }> {
    const docRef = await db.collection(this.collectionName).add(data);
    const snapshot = await docRef.get();
    return { id: snapshot.id, ...snapshot.data() } as T & { id: string };
  }

  async getDocuments(): Promise<(T & { id: string })[]> {
    const snapshot = await db.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as (T & { id: string })[];
  }

  async getDocumentById(id: string): Promise<(T & { id: string }) | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as T & { id: string };
  }

  async updateDocument(id: string, data: Partial<T>): Promise<(T & { id: string }) | null> {
    const docRef = db.collection(this.collectionName).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) return null;

    await docRef.update(data);
    const updated = await docRef.get();
    return { id: updated.id, ...updated.data() } as T & { id: string };
  }

  async deleteDocument(id: string): Promise<boolean> {
    const docRef = db.collection(this.collectionName).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) return false;

    await docRef.delete();
    return true;
  }
}
