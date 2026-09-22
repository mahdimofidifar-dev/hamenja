import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Check,
  Car,
  Wifi,
  Coffee,
  CreditCard,
  Accessibility,
  Sparkles,
  Clock,
  Plus,
  X,
  Copy,
  Trash2,
} from "lucide-react";

export const AMENITIES_LIST = [
  {
    id: "parking",
    label: "پارکینگ اختصاصی",
    icon: Car,
  },
  {
    id: "wifi",
    label: "اینترنت Wi-Fi رایگان",
    icon: Wifi,
  },
  {
    id: "cafe",
    label: "بوفه / کافه",
    icon: Coffee,
  },
  {
    id: "pos",
    label: "دستگاه کارتخوان",
    icon: CreditCard,
  },
  {
    id: "accessible",
    label: "مناسب برای معلولین",
    icon: Accessibility,
  },
  {
    id: "air_conditioning",
    label: "سیستم تهویه",
    icon: Sparkles,
  },
];

export const DAYS_OF_WEEK = [
  { id: "sat", label: "شنبه" },
  { id: "sun", label: "یکشنبه" },
  { id: "mon", label: "دوشنبه" },
  { id: "tue", label: "سه‌شنبه" },
  { id: "wed", label: "چهارشنبه" },
  { id: "thu", label: "پنجشنبه" },
  { id: "fri", label: "جمعه" },
];

const DEFAULT_RANGE = {
  open: "09:00",
  close: "23:00",
};

export function Step4Amenities({ formData, setFormData }) {
  const [newAmenity, setNewAmenity] = useState("");

  const [copySource, setCopySource] = useState(null);
  const [showCopyPanel, setShowCopyPanel] = useState(false);
  const [copyDays, setCopyDays] = useState([]);

  // -------------------------
  // امکانات
  // -------------------------

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenity);

      return {
        ...prev,
        amenities: isSelected
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const addCustomAmenity = () => {
    const value = newAmenity.trim();

    if (!value) return;

    const alreadyExists = formData.amenities.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );

    if (alreadyExists) {
      setNewAmenity("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, value],
    }));

    setNewAmenity("");
  };

  const removeAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((item) => item !== amenity),
    }));
  };

  // -------------------------
  // ساعات کاری
  // -------------------------

  const updateWorkingHours = (dayId, rangeIndex, field, value) => {
    setFormData((prev) => {
      const dayRanges = [...(prev.workingHours?.[dayId] || [])];

      dayRanges[rangeIndex] = {
        ...dayRanges[rangeIndex],
        [field]: value,
      };

      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [dayId]: dayRanges,
        },
      };
    });
  };

  const toggleWorkingDay = (dayId) => {
    setFormData((prev) => {
      const currentRanges = prev.workingHours?.[dayId] || [];

      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [dayId]: currentRanges.length > 0 ? [] : [{ ...DEFAULT_RANGE }],
        },
      };
    });
  };

  const addWorkingRange = (dayId) => {
    setFormData((prev) => {
      const dayRanges = [...(prev.workingHours?.[dayId] || [])];

      dayRanges.push({
        ...DEFAULT_RANGE,
      });

      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [dayId]: dayRanges,
        },
      };
    });
  };

  const removeWorkingRange = (dayId, rangeIndex) => {
    setFormData((prev) => {
      const dayRanges = [...(prev.workingHours?.[dayId] || [])];

      dayRanges.splice(rangeIndex, 1);

      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [dayId]: dayRanges,
        },
      };
    });
  };

  // -------------------------
  // کپی ساعات کاری
  // -------------------------

  const openCopyPanel = (dayId) => {
    setCopySource(dayId);
    setCopyDays([]);
    setShowCopyPanel(true);
  };

  const closeCopyPanel = () => {
    setShowCopyPanel(false);
    setCopySource(null);
    setCopyDays([]);
  };

  const toggleCopyDay = (dayId) => {
    setCopyDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId],
    );
  };

  const applyCopy = () => {
    if (!copySource || copyDays.length === 0) {
      return;
    }

    setFormData((prev) => {
      const sourceRanges = prev.workingHours?.[copySource] || [];

      const updatedWorkingHours = {
        ...prev.workingHours,
      };

      copyDays.forEach((dayId) => {
        updatedWorkingHours[dayId] = sourceRanges.map((range) => ({
          ...range,
        }));
      });

      return {
        ...prev,
        workingHours: updatedWorkingHours,
      };
    });

    closeCopyPanel();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* =========================
          امکانات
      ========================= */}

      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-900">
            امکانات و خدمات
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            امکاناتی که مشتریان در مجموعه شما پیدا می‌کنند انتخاب کنید.
          </p>
        </div>

        {/* امکانات انتخاب شده */}
        {formData.amenities.length > 0 && (
          <div className="mb-4 rounded-xl border border-brand-100 bg-brand-50/50 p-3">
            <p className="mb-2 text-xs font-medium text-gray-500">
              امکانات انتخاب‌شده
            </p>

            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity) => {
                const predefinedAmenity = AMENITIES_LIST.find(
                  (item) => item.id === amenity,
                );

                const label = predefinedAmenity?.label || amenity;

                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    className="
                      inline-flex items-center gap-1.5
                      rounded-lg border border-brand-200
                      bg-white px-3 py-1.5
                      text-sm font-medium text-brand-700
                      transition hover:border-red-200
                      hover:bg-red-50 hover:text-red-600
                    "
                    title="حذف امکان"
                  >
                    <span>{label}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* پیشنهادها */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {AMENITIES_LIST.map((item) => {
            const Icon = item.icon;
            const isSelected = formData.amenities.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleAmenity(item.id)}
                className={`
                  flex items-center justify-between
                  rounded-xl border px-4 py-3
                  text-right text-sm font-medium
                  transition-all
                  ${
                    isSelected
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </span>

                {isSelected && <Check className="h-4 w-4 text-brand-600" />}
              </button>
            );
          })}
        </div>

        {/* امکان سفارشی */}
        <div className="mt-5">
          <FieldLabel className="mb-2 block text-sm">
            امکان دیگری دارید؟
          </FieldLabel>

          <div className="flex gap-2">
            <Input
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomAmenity();
                }
              }}
              placeholder="مثلاً اتاق VIP"
            />

            <button
              type="button"
              onClick={addCustomAmenity}
              disabled={!newAmenity.trim()}
              className="
                inline-flex shrink-0 items-center gap-1.5
                rounded-lg bg-brand-600 px-4
                text-sm font-medium text-white
                transition hover:bg-brand-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Plus className="h-4 w-4" />
              افزودن
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* =========================
          ساعات کاری
      ========================= */}

      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-600" />

              <h3 className="text-base font-semibold text-gray-900">
                ساعات کاری
              </h3>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              ساعات فعالیت مجموعه را برای هر روز مشخص کنید.
            </p>
          </div>

          <label
            className="
              inline-flex w-fit cursor-pointer
              items-center gap-2 rounded-lg
              border border-gray-200 bg-white
              px-3 py-2 text-sm font-medium
              text-gray-700
            "
          >
            <input
              type="checkbox"
              checked={formData.is24Hours}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is24Hours: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded text-brand-600"
            />
            فعالیت ۲۴ ساعته
          </label>
        </div>

        {formData.is24Hours ? (
          <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-4 text-sm text-brand-700">
            <Check className="h-5 w-5 shrink-0" />

            <div>
              <p className="font-medium">
                مجموعه به صورت ۲۴ ساعته فعالیت می‌کند.
              </p>

              <p className="mt-1 text-xs text-brand-600">
                نیازی به تعیین ساعت برای روزهای هفته نیست.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {DAYS_OF_WEEK.map((day) => {
              const ranges = formData.workingHours?.[day.id] || [];

              const isWorkingDay = ranges.length > 0;

              const hasOvernightRange = ranges.some(
                (range) =>
                  range.open && range.close && range.close < range.open,
              );

              return (
                <div
                  key={day.id}
                  className={`
                    overflow-hidden rounded-xl border
                    transition
                    ${
                      isWorkingDay
                        ? "border-gray-200 bg-white"
                        : "border-gray-100 bg-gray-50/70"
                    }
                  `}
                >
                  {/* Header */}
                  <div
                    className={`
                      flex items-center justify-between
                      gap-3 px-4 py-3
                      ${isWorkingDay ? "bg-white" : "bg-gray-50"}
                    `}
                  >
                    <button
                      type="button"
                      onClick={() => toggleWorkingDay(day.id)}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={`
                          flex h-6 w-6 items-center
                          justify-center rounded-md border
                          ${
                            isWorkingDay
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-gray-300 bg-white"
                          }
                        `}
                      >
                        {isWorkingDay && <Check className="h-4 w-4" />}
                      </span>

                      <span
                        className={`
                          text-sm font-semibold
                          ${isWorkingDay ? "text-gray-900" : "text-gray-400"}
                        `}
                      >
                        {day.label}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          text-xs font-medium
                          ${isWorkingDay ? "text-brand-600" : "text-gray-400"}
                        `}
                      >
                        {isWorkingDay ? "فعال" : "تعطیل"}
                      </span>

                      {isWorkingDay && (
                        <button
                          type="button"
                          onClick={() => openCopyPanel(day.id)}
                          className="
                            inline-flex items-center gap-1.5
                            rounded-lg border border-gray-200
                            px-2.5 py-1.5 text-xs
                            font-medium text-gray-500
                            transition hover:bg-gray-50
                            hover:text-gray-700
                          "
                        >
                          <Copy className="h-3.5 w-3.5" />
                          کپی
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Ranges */}
                  {isWorkingDay && (
                    <div className="border-t border-gray-100 px-4 py-4">
                      <div className="space-y-3">
                        {ranges.map((range, index) => (
                          <div
                            key={index}
                            className="
                              flex items-end gap-2
                            "
                          >
                            <Field className="min-w-0 flex-1">
                              <FieldLabel className="mb-1.5 text-xs text-gray-500">
                                شروع
                              </FieldLabel>

                              <Input
                                type="time"
                                dir="ltr"
                                value={range.open}
                                onChange={(e) =>
                                  updateWorkingHours(
                                    day.id,
                                    index,
                                    "open",
                                    e.target.value,
                                  )
                                }
                              />
                            </Field>

                            <span className="mb-2 text-gray-300">—</span>

                            <Field className="min-w-0 flex-1">
                              <FieldLabel className="mb-1.5 text-xs text-gray-500">
                                پایان
                              </FieldLabel>

                              <Input
                                type="time"
                                dir="ltr"
                                value={range.close}
                                onChange={(e) =>
                                  updateWorkingHours(
                                    day.id,
                                    index,
                                    "close",
                                    e.target.value,
                                  )
                                }
                              />
                            </Field>

                            {ranges.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeWorkingRange(day.id, index)
                                }
                                className="
                                  mb-0.5 flex h-10 w-10
                                  shrink-0 items-center
                                  justify-center rounded-lg
                                  border border-red-100
                                  text-red-400 transition
                                  hover:bg-red-50
                                  hover:text-red-500
                                "
                                title="حذف بازه"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {hasOvernightRange && (
                        <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
                          ساعت پایان قبل از ساعت شروع است؛ این بازه تا روز بعد
                          ادامه خواهد داشت.
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <button
                          type="button"
                          onClick={() => addWorkingRange(day.id)}
                          className="
                            inline-flex items-center gap-1.5
                            text-xs font-medium
                            text-brand-600
                            hover:text-brand-700
                          "
                        >
                          <Plus className="h-4 w-4" />
                          افزودن بازه کاری
                        </button>

                        <button
                          type="button"
                          onClick={() => openCopyPanel(day.id)}
                          className="
                            inline-flex items-center gap-1.5
                            text-xs font-medium
                            text-gray-500
                            hover:text-gray-700
                          "
                        >
                          <Copy className="h-3.5 w-3.5" />
                          کپی برای روزهای دیگر
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!formData.is24Hours && (
          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-xs leading-6 text-gray-500">
            <span className="font-medium text-gray-700">نکته:</span> می‌توانید
            برای یک روز چند بازه کاری تعریف کنید؛ مثلاً ۹ تا ۱۴ و ۱۷ تا ۲۳. اگر
            ساعت پایان کمتر از ساعت شروع باشد، بازه تا روز بعد ادامه پیدا
            می‌کند.
          </div>
        )}
      </section>

      {/* =========================
          Copy Modal
      ========================= */}

      {showCopyPanel && copySource && (
        <div
          className="
            fixed inset-0 z-50 flex items-center
            justify-center bg-black/40 p-4
          "
        >
          <div
            className="
              w-full max-w-md overflow-hidden
              rounded-2xl bg-white shadow-xl
            "
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <h3 className="font-semibold text-gray-900">کپی ساعات کاری</h3>

                <p className="mt-1 text-xs text-gray-500">
                  ساعات{" "}
                  {DAYS_OF_WEEK.find((day) => day.id === copySource)?.label} را
                  برای روزهای انتخاب‌شده اعمال کنید.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCopyPanel}
                className="
                  flex h-8 w-8 items-center
                  justify-center rounded-lg
                  text-gray-400 transition
                  hover:bg-gray-100 hover:text-gray-600
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 p-5">
              {DAYS_OF_WEEK.filter((day) => day.id !== copySource).map(
                (day) => {
                  const selected = copyDays.includes(day.id);

                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleCopyDay(day.id)}
                      className={`
                      flex w-full items-center
                      justify-between rounded-xl
                      border px-4 py-3
                      text-right transition
                      ${
                        selected
                          ? "border-brand-500 bg-brand-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                    >
                      <span
                        className={`
                        text-sm font-medium
                        ${selected ? "text-brand-700" : "text-gray-700"}
                      `}
                      >
                        {day.label}
                      </span>

                      <span
                        className={`
                        flex h-5 w-5 items-center
                        justify-center rounded-md border
                        ${
                          selected
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-gray-300 bg-white"
                        }
                      `}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div className="flex gap-2 border-t bg-gray-50 p-4">
              <button
                type="button"
                onClick={closeCopyPanel}
                className="
                  flex-1 rounded-xl border
                  bg-white px-4 py-2.5
                  text-sm font-medium text-gray-600
                  hover:bg-gray-50
                "
              >
                انصراف
              </button>

              <button
                type="button"
                disabled={copyDays.length === 0}
                onClick={applyCopy}
                className="
                  flex-1 rounded-xl bg-brand-600
                  px-4 py-2.5 text-sm font-medium
                  text-white transition
                  hover:bg-brand-700
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                اعمال ساعات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
