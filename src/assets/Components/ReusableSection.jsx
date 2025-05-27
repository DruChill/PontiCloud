const ReusableSection = ({ title, highlight, paragraph }) => {
  return (
    <div className="max-w-xl">
      <h1 className='font-bold text-6xl text-wrap'>
        {title}<span className='text-primary'>{highlight}</span>
      </h1>
      {/* <i className="bi bi-option"></i> Text Animation */}
      <p className='my-4 text-base text-wrap sm:text-lg leading-relaxed'>{paragraph}</p>
    </div>
  );
};

export default ReusableSection;