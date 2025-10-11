export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  const performanceSummary = percentageChange >= 20
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
