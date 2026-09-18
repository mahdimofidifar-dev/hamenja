import { useState } from "react";
import StarRating from "../common/StarRating";
import { User } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { sendComment } from "@/apis/comment";

export default function ReviewsSection({ businessId, comments }) {
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userRating) return alert("لطفاً ابتدا امتیاز دهید");
    setIsSubmitting(true);
    try {
      const commentData = {
        rate: userRating,
        comment: newComment,
        userId: user._id,
        businessId,
      };
      console.log(commentData);

      let a = await sendComment(commentData);
      console.log(a);

      setNewComment("");
      setUserRating(0);
      setFormKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("befor finaly");

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-slate-200 p-4 rounded-lg"
      >
        <span className="text-sm text-slate-600">
          امتیاز شما به این کسب‌وکار:
        </span>
        <StarRating key={formKey} onRate={(score) => setUserRating(score)} />

        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نظر خود را درباره این خدمات بنویسید..."
          className="w-full border border-slate-200 rounded-lg p-3 text-sm text-text-main focus:outline-none focus:border-brand-500 transition-colors"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-end px-6 py-2 bg-brand-600 text-white font-medium rounded-lg text-sm hover:bg-brand-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت نظر"}
        </button>
      </form>

      {comments.map((item) => {
        return (
          <div className="flex flex-col gap-3 bg-brand-100 border border-slate-300 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-brand-700 flex items-center justify-center text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-text-muted">
                  {`${item.userId.name}  ${item.userId.lastName}`}
                </span>
              </div>
              <StarRating initialRating={item.rate} totalStars={5} readOnly />
            </div>
            <p className="text-sm text-text-main leading-relaxed">
              {item.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
}
