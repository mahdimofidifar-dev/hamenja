const DividerTitle = ({title}) => {
  return (
    <div className="flex items-center gap-4 w-full p-4">
      <span className="text-md font-semibold text-slate-500 whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-[1px] bg-slate-200" />
    </div>
  );
};
export default DividerTitle;
