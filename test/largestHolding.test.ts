import { findLargestHolding, Asset } from "../src/portfolio/portfolioPerformance";

describe("findLargestHolding", () => {
  it("should return the asset with the highest value", () => {
    const assets: Asset[] = [
      { name: "Stocks", value: 5000 },
      { name: "Bonds", value: 3000 },
      { name: "House", value: 20000 },
    ];

    const result = findLargestHolding(assets);
    expect(result).toEqual({ name: "House", value: 20000 });
  });

  it("should return null for an empty array", () => {
    const result = findLargestHolding([]);
    expect(result).toBeNull();
  });

  it("should return the first asset in case of a tie", () => {
    const assets: Asset[] = [
      { name: "Gold", value: 5000 },
      { name: "Stocks", value: 5000 },
    ];

    const result = findLargestHolding(assets);
    expect(result).toEqual({ name: "Gold", value: 5000 });
  });
});
