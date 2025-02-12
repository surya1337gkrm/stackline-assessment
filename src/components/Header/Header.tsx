import React from 'react';
import logo from '../../assets/logo.svg';
const Header: React.FC = () => {
  return (
    <header className='bg-blue-950 w-full shadow-md p-4 flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <img src={logo} alt='Stackline logo' className='h-8 w-min' />
      </div>
    </header>
  );
};

export default Header;
