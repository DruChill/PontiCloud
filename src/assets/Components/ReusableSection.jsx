import React from 'react';

const ReusableSection = ({ title, highlight, paragraph }) => {
  return (
    <div>
      <h1 className='font-bold text-6xl'>
        {title}<span className='text-primary'>{highlight}</span>
      </h1>
      {/* <i className="bi bi-option"></i> Text Animation */}
      <p className='my-4 max-w-xl text-base sm:text-lg leading-relaxed'>{paragraph}</p>
    </div>
  );
};

export default ReusableSection;