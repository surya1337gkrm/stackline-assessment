import React from 'react';

interface ProductInfoProps {
  title: string;
  subtitle: string;
  tags: string[];
  image?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  subtitle,
  tags,
  image,
}) => {
  return (
    <div className='bg-white p-6 shadow-md h-min lg:h-screen min-w-fit flex flex-col items-center'>
      {image && <img src={image} alt={title} className='w-min h-min' />}
      <h1 className='text-xl font-bold text-gray-800 text-center'>{title}</h1>
      <p className='text-sm text-gray-400 mt-2 text-center'>{subtitle}</p>
      <div className='mt-4'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='inline-block border border-2-grey-400 text-gray-700 px-2 py-1 rounded-sm text-sm mr-2 mb-2 text-center'>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
