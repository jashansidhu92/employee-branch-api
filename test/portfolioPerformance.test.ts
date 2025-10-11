import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("should correctly calculate profit when currentValue > initialInvestment", () => {
    const result = calculatePortfolioPerformance(10000, 12500);

    expect(result.initialInvestment).toBe(10000);
    expect(result.currentValue).toBe(12500);
    expect(result.profitOrLoss).toBe(2500);
    expect(result.percentageChange).toBeCloseTo(25);
    expect(result.performanceSummary).toContain("gained significantly");
  });

  it("should correctly calculate loss when currentValue < initialInvestment", () => {
    const result = calculatePortfolioPerformance(10000, 8500);

    expect(result.profitOrLoss).toBe(-1500);
    expect(result.percentageChange).toBeCloseTo(-15);
    expect(result.performanceSummary).toContain("declined");
  });

  it("should return unchanged performance when currentValue = initialInvestment", () => {
    const result = calculatePortfolioPerformance(10000, 10000);

    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.performanceSummary).toContain("unchanged");
  });

  it("should always return valid numeric values", () => {
    const result = calculatePortfolioPerformance(5000, 7000);

    expect(typeof result.profitOrLoss).toBe("number");
    expect(typeof result.percentageChange).toBe("number");
    expect(result).toHaveProperty("performanceSummary");
  });
});
