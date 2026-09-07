import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const ReadMore = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2 px-3">
      <p
        className={`text-lg text-text-mutded leading-relaxed transition-all duration-300 ${
          !isExpanded ? "line-clamp-5" : ""
        }`}
      >
        {text}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 w-fit cursor-pointer"
      >
        <span>{isExpanded ? "بستن" : "مشاهده بیشتر"}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
export default ReadMore;
