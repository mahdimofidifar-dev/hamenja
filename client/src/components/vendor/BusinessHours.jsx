import { toPersianDigits } from "@/utils/businessTime";

const DAYS = [
  { id: "sat", label: "شنبه" },
  { id: "sun", label: "یکشنبه" },
  { id: "mon", label: "دوشنبه" },
  { id: "tue", label: "سه‌شنبه" },
  { id: "wed", label: "چهارشنبه" },
  { id: "thu", label: "پنجشنبه" },
  { id: "fri", label: "جمعه" },
];

const toPersianTime = (time) => {
  if (!time) return "";

  return time
    .split(":")
    .map((part) => toPersianDigits(part))
    .join(":");
};

const BusinessHours = ({ workingHours = {}, is24Hours = false }) => {
  if (is24Hours) {
    return (
      <div className="px-4">
        <div className="rounded-xl bg-brand-100 p-4 text-sm text-brand-700">
          این مجموعه به صورت ۲۴ ساعته فعالیت می‌کند.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 px-4">
      {DAYS.map((day) => {
        const ranges = workingHours?.[day.id] || [];

        return (
          <div
            key={day.id}
            className="flex items-start justify-between rounded-xl bg-brand-100 p-3"
          >
            <span className="font-medium text-gray-700">{day.label}</span>

            {ranges.length > 0 ? (
              <div className="flex flex-col items-end gap-1">
                {ranges.map((range, index) => (
                  <span key={index} dir="rtl" className="text-sm text-gray-600">
                    {toPersianTime(range.open)} تا {toPersianTime(range.close)}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-400">تعطیل</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BusinessHours;
