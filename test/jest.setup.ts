jest.mock("../config/firebase", () => ({
  auth: {
    verifyIdToken: jest.fn(),
    getUser: jest.fn(),
  },
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(async () => ({
        id: "mocked-id",
        get: async () => ({
          id: "mocked-id",
          data: () => ({ name: "Mocked Document" }),
        }),
      })),
      get: jest.fn(async () => ({
        docs: [
          {
            id: "mocked-doc",
            data: () => ({ name: "Mocked Data" }),
          },
        ],
      })),
      doc: jest.fn(() => ({
        get: jest.fn(async () => ({
          exists: true,
          id: "mocked-doc",
          data: () => ({ name: "Mocked Data" }),
        })),
        update: jest.fn(async () => {}),
        delete: jest.fn(async () => {}),
      })),
    })),
    runTransaction: jest.fn(),
    batch: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetModules();
});
