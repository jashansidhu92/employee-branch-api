jest.mock("../config/firebase", () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn(),
      get: jest.fn(),
      where: jest.fn(() => ({
        get: jest.fn(),
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
