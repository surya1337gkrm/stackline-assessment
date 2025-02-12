// src/containers/ProductContainer.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../store/productSlice.ts'; // Import the fetch action
import { RootState, AppDispatch } from '../../store/store.ts'; // Import the RootState type
import ProductInfo from '../Product/ProductInfo.tsx';
import SalesChart from '../SalesChart/SalesChart.tsx';
import SalesTable from '../SalesTable/SalesTable.tsx';

const ProductContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access the product data, loading state, and error from the Redux store
  const { product, status, error } = useSelector(
    (state: RootState) => state.product
  );

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  // Handle loading state
  if (status === 'loading') {
    return <div className='animate-pulse'>Loading...</div>;
  }

  // Handle error state
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Handle case where no product data is available
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
