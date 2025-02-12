import React from 'react';
import Header from './components/Header/Header.tsx';
import ProductContainer from './components/container/ProductContainer.tsx';
const App = () => {
  return (
    <div className='flex flex-col gap-y-10 bg-gray-100'>
      <Header />
      <ProductContainer />
    </div>
  );
};

export default App;
