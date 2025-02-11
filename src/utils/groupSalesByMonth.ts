// src/utils/groupSalesByMonth.ts
import { Sale } from '../utils/types'; // Import the Sale type

export const groupSalesByMonth = (sales: Sale[]) => {
  const monthlyData: {
    [key: string]: { retailSales: number; wholesaleSales: number };
  } = {};

  sales.forEach((sale) => {
    const date = new Date(sale.weekEnding);
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Jan 2023"

    if (!monthlyData[month]) {
      monthlyData[month] = { retailSales: 0, wholesaleSales: 0 };
    }

    // Add to cumulative sales
    monthlyData[month].retailSales += sale.retailSales;
    monthlyData[month].wholesaleSales += sale.wholesaleSales;
  });

  // Convert to an array of objects for Recharts
  const monthlySalesArray = Object.keys(monthlyData).map((month) => ({
    month,
    retailSales: monthlyData[month].retailSales,
    wholesaleSales: monthlyData[month].wholesaleSales,
  }));

  // Sort the data by month and year
  monthlySalesArray.sort((a, b) => {
    // Convert "Jan 2023" to "01/01/2023" for proper date parsing
    const dateA = new Date(`01 ${a.month}`);
    const dateB = new Date(`01 ${b.month}`);
    return dateA.getTime() - dateB.getTime();
  });

  return monthlySalesArray;
};
