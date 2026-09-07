import { useState } from "react";
import { ListFilter, Settings } from "lucide-react";

const FilterBar = () => {
  const [isFilterSelect, useIsFilterSelect] = useState(false);

  return (
    <div className="filter-bar flex gap-2  border-b border-brand-200 p-2">
      <button className="filter rounded-2xl h-8 w-fit px-3 bg-brand-100 flex items-center gap-1">
        <Settings className="size-5" />
        فیلتر
      </button>
      <button className="filter rounded-2xl h-8 w-fit px-3 bg-brand-100 flex items-center gap-1">
        <ListFilter className="size-5" /> جدیدترین
      </button>
      {isFilterSelect ? (
        <button className="filter rounded-2xl h-8 w-fit px-3 bg-brand-300 flex items-center gap-1">
          <X className="text-red-500 size-5" /> قیمت
        </button>
      ) : (
        <button className="filter rounded-2xl h-8 w-fit px-3 bg-brand-100 flex items-center gap-1">
          قیمت
        </button>
      )}
    </div>
  );
};
export default FilterBar;
