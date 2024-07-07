const SkeletonText = ({
  widthClass,
  heightClass,
  className,
}: {
  widthClass?: string;
  heightClass?: string;
  className?: string;
}) => {
  return (
    <>
      <div role="status" className="max-w-sm animate-pulse">
        <div
          className={`${widthClass} ${heightClass}  bg-gray-200 dark:bg-gray-700 ${className}`}
        ></div>
      </div>
    </>
  );
};
export default SkeletonText;
