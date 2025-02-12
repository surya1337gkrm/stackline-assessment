import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { groupSalesByMonth } from '../../utils/groupSalesByMonth.ts';

const SalesChart: React.FC = () => {
  const salesData = useSelector(
    (state: RootState) => state.product.product?.sales
  );

  if (!salesData) return;
  const monthlySalesData = groupSalesByMonth(salesData);

  return (
    <ResponsiveContainer
      width='100%'
      height={400}
      className=' bg-white mb-8 p-4'>
      <div className='text-lg text-gray-500'>Retail Sales</div>
      <LineChart
        data={monthlySalesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 0,
        }}>
        <XAxis dataKey='month' />
        <Tooltip />
        <Line
          type='monotone'
          dot={false}
          dataKey='retailSales'
          stroke='steelblue'
          strokeWidth='3'
        />
        <Line
          type='monotone'
          dataKey='wholesaleSales'
          stroke='#899499'
          strokeWidth='3'
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
