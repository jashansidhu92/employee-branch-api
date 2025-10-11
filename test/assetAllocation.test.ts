import { calculateAssetAllocation, Asset } from "../src/portfolio/portfolioPerformance";

describe("calculateAssetAllocation", () => {
  it("should correctly calculate even asset allocation percentages", () => {
    const assets: Asset[] = [
      { name: "Stocks", value: 5000 },
      { name: "Bonds", value: 5000 },
    ];

    const result = calculateAssetAllocation(assets);

    expect(result).toEqual([
      { name: "Stocks", value: 5000, percentage: 50 },
      { name: "Bonds", value: 5000, percentage: 50 },
    ]);
  });

  it("should correctly calculate uneven asset allocations", () => {
    const assets: Asset[] = [
      { name: "Stocks", value: 8000 },
      { name: "Bonds", value: 2000 },
    ];

    const result = calculateAssetAllocation(assets);

    expect(result[0].percentage).toBeCloseTo(80);
    expect(result[1].percentage).toBeCloseTo(20);
  });

  it("should return an empty array for no assets", () => {
    const result = calculateAssetAllocation([]);
    expect(result).toEqual([]);
  });
});
