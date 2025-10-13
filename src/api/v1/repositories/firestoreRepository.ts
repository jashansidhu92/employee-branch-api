import { db } from "../../../../config/firebase";

export class FirestoreRepository<T extends { [k: string]: any }> {
  constructor(private collectionName: string) {}

  async createDocument(data: T): Promise<T & { id: string }> {
    const ref = await db.collection(this.collectionName).add(data);
    const snap = await ref.get();
    return { id: snap.id, ...snap.data() } as T & { id: string };
    }

  async getDocuments(): Promise<(T & { id: string })[]> {
    const snapshot = await db.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T & { id: string }));
  }

  async getDocumentById(id: string): Promise<(T & { id: string }) | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as T & { id: string };
  }

  async updateDocument(id: string, data: Partial<T>): Promise<(T & { id: string }) | null> {
    const ref = db.collection(this.collectionName).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return null;
    await ref.update(data);
    const updated = await ref.get();
    return { id: updated.id, ...updated.data() } as T & { id: string };
  }

  async deleteDocument(id: string): Promise<boolean> {
    const ref = db.collection(this.collectionName).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return false;
    await ref.delete();
    return true;
  }
}
