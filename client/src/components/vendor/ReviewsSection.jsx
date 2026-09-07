import { useState } from "react";
import StarRating from "../common/StarRating";
import { User } from "lucide-react";

export default function ReviewsSection() {
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRating) return alert("لطفاً ابتدا امتیاز دهید");
    // ارسال به Backend...
    console.log({ rating: userRating, comment: newComment });
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      {/* فرم ثبت نظر جدید */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-slate-200 p-4 rounded-lg"
      >
        <span className="text-sm text-slate-300">
          امتیاز شما به این کسب‌وکار:
        </span>
        <StarRating onRate={(score) => setUserRating(score)} />

        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نظر خود را درباره این خدمات بنویسید..."
          className="w-full border border-slate-200 rounded-lg p-3 text-sm text-text-main focus:outline-none focus:border-brand-500 transition-colors"
        />

        <button
          type="submit"
          className="self-end px-6 py-2 bg-brand-600 text-white font-medium rounded-lg text-sm hover:bg-brand-500 transition-colors cursor-pointer"
        >
          ثبت نظر
        </button>
      </form>

      {/* کارت نمایش یک نظر نمونه */}
      <div className="flex flex-col gap-3 bg-slate-300 border border-slate-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-text-muted">مهدی</span>
          </div>
          <StarRating initialRating={4} totalStars={5} />
        </div>
        <p className="text-sm text-text-main leading-relaxed">
          کیفیت خدمات عالی بود، برخورد پرسنل هم بسیار محترمانه بود. پیشنهاد
          می‌کنم.
        </p>
      </div>
    </div>
  );
}
