import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  totalStars = 5,
  initialRating = 0,
  onRate,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRate = (value) => {
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
            onClick={() => handleRate(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
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
