// src/containers/ProductContainer.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../store/productSlice.ts'; // Import the fetch action
import { RootState, AppDispatch } from '../../store/store.ts'; // Import the RootState type
import ProductInfo from '../Product/ProductInfo.tsx';

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
    return <div>Loading...</div>;
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
    <div>
      <aside className='w-1/5 p-4 flex items-center justify-center'>
        <ProductInfo
          title={product.title}
          subtitle={product.subtitle}
          tags={product.tags}
          image={product.image}
        />
      </aside>
    </div>
  );
};

export default ProductContainer;
