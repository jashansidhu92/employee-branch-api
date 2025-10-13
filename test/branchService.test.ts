import * as service from "../src/api/v1/services/branchService";
import { FirestoreRepository } from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");
const MockRepo = FirestoreRepository as jest.MockedClass<typeof FirestoreRepository>;

const fake = {
  createDocument: jest.fn(),
  getDocuments: jest.fn(),
  getDocumentById: jest.fn(),
  updateDocument: jest.fn(),
  deleteDocument: jest.fn()
};

(MockRepo as any).mockImplementation(() => fake);

describe("branchService", () => {
  afterEach(() => jest.clearAllMocks());

  it("getAll returns branches", async () => {
    const data = [{ id: "1", name: "Winnipeg Branch" }];
    fake.getDocuments.mockResolvedValue(data as any);
    const res = await service.getAll();
    expect(res).toEqual(data);
  });

  it("getById returns one", async () => {
    const item = { id: "2", name: "Vancouver Branch" };
    fake.getDocumentById.mockResolvedValue(item as any);
    const res = await service.getById("2");
    expect(res).toEqual(item);
  });

  it("create creates branch", async () => {
    const created = { id: "3", name: "Toronto Branch" };
    fake.createDocument.mockResolvedValue(created as any);
    const res = await service.create({ name: "Toronto Branch" });
    expect(res).toEqual(created);
  });

  it("update updates branch", async () => {
    const updated = { id: "1", name: "Updated Branch" };
    fake.updateDocument.mockResolvedValue(updated as any);
    const res = await service.update("1", { name: "Updated Branch" });
    expect(res).toEqual(updated);
  });

  it("remove deletes branch", async () => {
    fake.deleteDocument.mockResolvedValue(true as any);
    const res = await service.remove("1");
    expect(res).toBe(true);
  });
});
