import React from 'react';

const Skeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-5 m-8 lg:m-2 lg:grid-cols-5 lg:gap-2'>
      <aside className='col-span-1 w-full lg:p-2'>
        <div className='bg-white p-6 shadow-md h-min lg:h-screen min-w-fit flex flex-col items-center gap-2'>
          <div className='w-[250px] h-[250px] bg-gray-300 animate-pulse'></div>
          <div className='w-[200px] h-2 bg-gray-300 animate-pulse'></div>
          <div className='w-[150px] h-2 bg-gray-300 animate-pulse'></div>
        </div>
      </aside>
      <main className='col-span-1 flex flex-col w-full h-full lg:p-2 lg:col-span-4'>
        <div className='flex flex-col gap-y-5 lg:gap-8 flex-grow'>
          <div className='min-w-fit h-[400px] bg-white'>
            <div className='min-w-fit h-[300px] m-8 bg-gray-300 animate-pulse'></div>
          </div>

          <div className='min-w-fit h-[400px] bg-white'>
            <div className='min-w-fit h-[300px] m-8 bg-gray-300 animate-pulse'></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skeleton;
