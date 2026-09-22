import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ReadMore = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLong, setIsLong] = useState(false);

  const measureRef = useRef(null);

  useEffect(() => {
    if (!measureRef.current) return;

    const element = measureRef.current;

    const lineHeight = parseFloat(getComputedStyle(element).lineHeight);

    const lineCount = Math.ceil(element.scrollHeight / lineHeight);

    setIsLong(lineCount > 5);
  }, [text]);

  return (
    <div className="relative flex mx-auto flex-col gap-2 px-3 w-[95%]">
      <p
        className={`text text-lg leading-relaxed text-wrap transition-all duration-300 ${
          isLong && !isExpanded ? "line-clamp-5" : ""
        }`}
      >
        {text}
      </p>

      <p
        ref={measureRef}
        className="absolute invisible pointer-events-none w-full text text-lg leading-relaxed"
      >
        {text}
      </p>

      {isLong && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 w-fit cursor-pointer"
        >
          <span>{isExpanded ? "بستن" : "مشاهده بیشتر"}</span>

          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
