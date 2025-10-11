export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export interface Asset {
  name: string;
  value: number;
  type?: string; 
}

export interface AssetAllocation {
  name: string;
  value: number;
  percentage: number;
}

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  const performanceSummary =
    percentageChange >= 20
      ? `📈 The portfolio has gained significantly with a profit of $${profitOrLoss.toFixed(2)}.`
      : percentageChange > 0
      ? `✅ The portfolio shows a modest gain of $${profitOrLoss.toFixed(2)}.`
      : percentageChange === 0
      ? `⚖️ The portfolio value remains unchanged.`
      : `📉 The portfolio has declined with a loss of $${Math.abs(profitOrLoss).toFixed(2)}.`;

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange: Number(percentageChange.toFixed(2)),
    performanceSummary,
  };
}

export function findLargestHolding(assets: Asset[]): Asset | null {
  if (assets.length === 0) return null;

  return assets.reduce((largest, current) =>
    current.value > largest.value ? current : largest
  );
}

export function calculateAssetAllocation(assets: Asset[]): AssetAllocation[] {
  if (assets.length === 0) return [];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return assets.map((asset) => ({
    name: asset.name,
    value: asset.value,
    percentage: Number(((asset.value / totalValue) * 100).toFixed(2)),
  }));
}
