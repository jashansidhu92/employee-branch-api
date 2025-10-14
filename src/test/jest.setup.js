"use strict";
jest.mock("../config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
        getUser: jest.fn(),
    },
    db: {
        collection: jest.fn(() => ({
            add: jest.fn(),
            get: jest.fn(),
            doc: jest.fn(() => ({
                get: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            })),
            where: jest.fn(() => ({ get: jest.fn() })),
        })),
    },
}));
afterEach(() => {
    jest.clearAllMocks();
});
afterAll(() => {
    jest.resetModules();
});
//# sourceMappingURL=jest.setup.js.map