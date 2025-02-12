import { Sale } from '../utils/types';

export const groupSalesByMonth = (sales: Sale[]) => {
  const monthlyData: {
    [key: string]: { retailSales: number; wholesaleSales: number };
  } = {};

  sales.forEach((sale) => {
    const date = new Date(sale.weekEnding);
    const month = date.toLocaleString('default', { month: 'short' });

    if (!monthlyData[month]) {
      monthlyData[month] = { retailSales: 0, wholesaleSales: 0 };
    }

    monthlyData[month].retailSales += sale.retailSales;
    monthlyData[month].wholesaleSales += sale.wholesaleSales;
  });

  const monthlySalesArray = Object.keys(monthlyData).map((month) => ({
    month,
    retailSales: monthlyData[month].retailSales,
    wholesaleSales: monthlyData[month].wholesaleSales,
  }));

  // sort the data by month
  monthlySalesArray.sort((a, b) => {
    const dateA = new Date(`01 ${a.month}`);
    const dateB = new Date(`01 ${b.month}`);
    return dateA.getTime() - dateB.getTime();
  });

  return monthlySalesArray;
};
