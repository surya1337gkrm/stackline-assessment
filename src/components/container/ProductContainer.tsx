import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../store/productSlice.ts';
import { RootState, AppDispatch } from '../../store/store.ts';
import ProductInfo from '../Product/ProductInfo.tsx';
import SalesChart from '../SalesChart/SalesChart.tsx';
import SalesTable from '../SalesTable/SalesTable.tsx';

const ProductContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, status, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className='animate-pulse'>Loading...</div>;
  }


  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product data available.</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-0'>
      <aside className='col-span-1 w-full lg:p-2 flex lg:flex-col'>
        <ProductInfo
          title={product.title}
          subtitle={product.subtitle}
          tags={product.tags}
          image={product.image}
        />
      </aside>
      <main className='col-span-1 flex flex-col w-full h-full lg:p-2 lg:col-span-4'>
        <div className='flex flex-col gap-y-10 lg:gap-16 flex-grow'>
          <SalesChart />
          <SalesTable data={product.sales} />
        </div>
      </main>
    </div>
  );
};

export default ProductContainer;
