import * as employeeService from "../src/api/v1/services/employeeService";
import { FirestoreRepository } from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

const MockRepo = FirestoreRepository as jest.MockedClass<typeof FirestoreRepository>;
const mockRepoInstance = {
  createDocument: jest.fn(),
  getDocuments: jest.fn(),
  getDocumentById: jest.fn(),
  updateDocument: jest.fn(),
  deleteDocument: jest.fn(),
};
(MockRepo as any).mockImplementation(() => mockRepoInstance);

describe("Employee Service", () => {
  afterEach(() => jest.clearAllMocks());

  it("should fetch all employees", async () => {
    const fakeEmployees = [{ id: "1", name: "Alice" }];
    mockRepoInstance.getDocuments.mockResolvedValue(fakeEmployees);

    const result = await employeeService.getAll();
    expect(result).toEqual(fakeEmployees);
    expect(mockRepoInstance.getDocuments).toHaveBeenCalledTimes(1);
  });

  it("should fetch employee by ID", async () => {
    const fakeEmployee = { id: "1", name: "Alice" };
    mockRepoInstance.getDocumentById.mockResolvedValue(fakeEmployee);

    const result = await employeeService.getById("1");
    expect(result).toEqual(fakeEmployee);
    expect(mockRepoInstance.getDocumentById).toHaveBeenCalledWith("1");
  });

  it("should create new employee", async () => {
    const newEmployee = { id: "2", name: "Bob" };
    mockRepoInstance.createDocument.mockResolvedValue(newEmployee);

    const result = await employeeService.create({ name: "Bob" });
    expect(result).toEqual(newEmployee);
    expect(mockRepoInstance.createDocument).toHaveBeenCalledWith({ name: "Bob" });
  });

  it("should update employee", async () => {
    const updated = { id: "1", name: "Alice Updated" };
    mockRepoInstance.updateDocument.mockResolvedValue(updated);

    const result = await employeeService.update("1", { name: "Alice Updated" });
    expect(result).toEqual(updated);
    expect(mockRepoInstance.updateDocument).toHaveBeenCalledWith("1", { name: "Alice Updated" });
  });

  it("should delete employee", async () => {
    mockRepoInstance.deleteDocument.mockResolvedValue(true);

    const result = await employeeService.remove("1");
    expect(result).toBe(true);
    expect(mockRepoInstance.deleteDocument).toHaveBeenCalledWith("1");
  });
});
