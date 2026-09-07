"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Check, Car, Wifi, Coffee, CreditCard, Accessibility, Sparkles, Clock } from "lucide-react";

export const AMENITIES_LIST = [
  { id: "parking", label: "پارکینگ اختصاصی", icon: Car },
  { id: "wifi", label: "اینترنت Wi-Fi رایگان", icon: Wifi },
  { id: "cafe", label: "بوفه / کافه", icon: Coffee },
  { id: "pos", label: "دستگاه کارتخوان", icon: CreditCard },
  { id: "accessible", label: "مناسب برای معلولین", icon: Accessibility },
  { id: "air_conditioning", label: "سیستم تهویه", icon: Sparkles },
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

export function Step4Amenities({ formData, setFormData }) {
  const toggleAmenity = (id) => {
    const isSelected = formData.amenities.includes(id);
    setFormData({
      ...formData,
      amenities: isSelected
        ? formData.amenities.filter((item) => item !== id)
        : [...formData.amenities, id],
    });
  };

  const toggleWorkingDay = (dayId) => {
    const isSelected = formData.workingDays.includes(dayId);
    setFormData({
      ...formData,
      workingDays: isSelected
        ? formData.workingDays.filter((d) => d !== dayId)
        : [...formData.workingDays, dayId],
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Field>
        <FieldLabel className="text-base font-semibold block mb-2">امکانات و خدمات مجموعه</FieldLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AMENITIES_LIST.map((item) => {
            const Icon = item.icon;
            const isSelected = formData.amenities.includes(item.id);
            return (
              <button key={item.id} type="button" onClick={() => toggleAmenity(item.id)} className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all text-right ${isSelected ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${isSelected ? "bg-indigo-600 text-white" : "border border-gray-300 bg-white"}`}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </Field>

      <hr className="border-gray-100" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <FieldLabel className="text-base font-semibold flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-600" /> ساعات کاری</FieldLabel>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is24Hours} onChange={(e) => setFormData({ ...formData, is24Hours: e.target.checked })} className="w-4 h-4 rounded text-indigo-600" /> فعالیت ۲۴ ساعته
          </label>
        </div>

        {!formData.is24Hours && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border">
            <Field>
              <FieldLabel>ساعت شروع کار</FieldLabel>
              <Input type="time" dir="ltr" value={formData.openTime} onChange={(e) => setFormData({ ...formData, openTime: e.target.value })} />
            </Field>
            <Field>
              <FieldLabel>ساعت پایان کار</FieldLabel>
              <Input type="time" dir="ltr" value={formData.closeTime} onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })} />
            </Field>
          </div>
        )}

        <Field>
          <FieldLabel className="mb-2 block">روزهای کاری هفته</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = formData.workingDays.includes(day.id);
              return (
                <button key={day.id} type="button" onClick={() => toggleWorkingDay(day.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${isSelected ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                  {day.label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>
    </div>
  );
}