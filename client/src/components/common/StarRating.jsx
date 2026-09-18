import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  totalStars = 5,
  initialRating = 0,
  onRate,
  readOnly = false,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRate = (value) => {
    if (readOnly) return;
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div className="flex items-center gap-1 dir-ltr">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || rating);

        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onClick={() => handleRate(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={`p-1 transition-transform focus:outline-none ${
              readOnly ? "cursor-default" : "hover:scale-110 cursor-pointer"
            }`}
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-600 fill-transparent"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
