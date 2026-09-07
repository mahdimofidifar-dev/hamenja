"use client";

import { useState } from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Check,
  ChevronsUpDown,
  X,
  Phone,
  Smartphone,
//   Instagram,
  Globe,
  Building2,
  MapPin,
  Map,
  Car,
  Wifi,
  Coffee,
  CreditCard,
  Accessibility,
  Sparkles,
  Clock,
  Upload,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// تنظیم آیکون مارکر نقشه Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ثابت‌ها و دیتای ثابت
const CATEGORIES_DATA = [
  { id: "entertainment", label: "تفریحی و سرگرمی", type: "main" },
  {
    id: "gamenet",
    label: "گیم‌نت",
    type: "sub",
    parentLabel: "تفریحی و سرگرمی",
  },
  {
    id: "escaperoom",
    label: "اتاق فرار",
    type: "sub",
    parentLabel: "تفریحی و سرگرمی",
  },
  {
    id: "ps5",
    label: "کلوپ بازی / PS5",
    type: "sub",
    parentLabel: "تفریحی و سرگرمی",
  },
  { id: "cafe", label: "کافه و رستوران", type: "main" },
  {
    id: "boardgame",
    label: "بردگیم کافه",
    type: "sub",
    parentLabel: "کافه و رستوران",
  },
];

const AMENITIES_LIST = [
  { id: "parking", label: "پارکینگ اختصاصی", icon: Car },
  { id: "wifi", label: "اینترنت Wi-Fi رایگان", icon: Wifi },
  { id: "cafe", label: "بوفه / کافه", icon: Coffee },
  { id: "pos", label: "دستگاه کارتخوان", icon: CreditCard },
  { id: "accessible", label: "مناسب برای معلولین", icon: Accessibility },
  { id: "air_conditioning", label: "سیستم تهویه", icon: Sparkles },
];

const DAYS_OF_WEEK = [
  { id: "sat", label: "شنبه" },
  { id: "sun", label: "یکشنبه" },
  { id: "mon", label: "دوشنبه" },
  { id: "tue", label: "سه‌شنبه" },
  { id: "wed", label: "چهارشنبه" },
  { id: "thu", label: "پنجشنبه" },
  { id: "fri", label: "جمعه" },
];

const STEPS = [
  { id: 1, title: "اطلاعات پایه" },
  { id: 2, title: "ارتباطات" },
  { id: 3, title: "موقعیت مکانی" },
  { id: 4, title: "امکانات و زمان‌بندی" },
  { id: 5, title: "تصاویر" },
];

// کامپوننت کمکی کلیک روی نقشه
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={customIcon} />
  );
}

export default function SingleFileAddBusinessForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);

  // استیت جامع و یکپارچه کل فرم
  const [formData, setFormData] = useState({
    title: "",
    categories: [],
    description: "",
    mobile: "",
    phone: "",
    // instagram: "",
    website: "",
    province: "",
    city: "",
    neighborhood: "",
    address: "",
    latitude: 35.6892,
    longitude: 51.389,
    amenities: [],
    is24Hours: false,
    openTime: "09:00",
    closeTime: "23:00",
    workingDays: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
    coverImage: null,
    gallery: [],
  });

  // توابع جابه‌جایی بین مراحل
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // توابع کمکی آپدیت استیت‌ها
  const toggleCategory = (id) => {
    const isSelected = formData.categories.includes(id);
    const newCategories = isSelected
      ? formData.categories.filter((catId) => catId !== id)
      : [...formData.categories, id];
    setFormData({ ...formData, categories: newCategories });
  };

  const removeCategory = (e, id) => {
    e.stopPropagation();
    setFormData({
      ...formData,
      categories: formData.categories.filter((catId) => catId !== id),
    });
  };

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

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverImage: URL.createObjectURL(file) });
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setFormData({
        ...formData,
        gallery: [...formData.gallery, ...newImages],
      });
    }
  };

  const removeGalleryImage = (index) => {
    const updated = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("دیتای نهایی ثبت شده:", formData);
    alert("کسب‌وکار با موفقیت ثبت شد!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-md border border-gray-100 my-8">
      {/* هدر نمایش مراحل (Stepper Visual) */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative z-10">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCompleted
                      ? "bg-indigo-600 text-white"
                      : isCurrent
                        ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline-block ${
                    isCurrent ? "text-indigo-600 font-bold" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ==================== مرحله ۱: اطلاعات پایه ==================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <Field>
              <FieldLabel>نام کسب‌وکار / مجموعه *</FieldLabel>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="مثلاً: مجموعه تفریحی پرو اکسل"
              />
              <FieldDescription>
                نام اصلی که در کارت و بالاتری بخش نمایش داده می‌شود.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>دسته‌بندی و حوزه فعالیت *</FieldLabel>
              <Popover
                open={categoryPopoverOpen}
                onOpenChange={setCategoryPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between min-h-[44px] p-2 border rounded-lg text-sm bg-white gap-2 flex-wrap text-right"
                  >
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {formData.categories.length > 0 ? (
                        formData.categories.map((id) => {
                          const item = CATEGORIES_DATA.find((c) => c.id === id);
                          if (!item) return null;
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs px-2 py-1 rounded-md font-medium"
                            >
                              {item.label}
                              <X
                                className="w-3 h-3 cursor-pointer hover:text-red-500"
                                onClick={(e) => removeCategory(e, id)}
                              />
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 p-1">
                          جستجو یا انتخاب دسته‌بندی‌ها...
                        </span>
                      )}
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-gray-400 shrink-0 mr-auto" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="مثلاً: گیم‌نت، تفریحی..." />
                    <CommandList>
                      <CommandEmpty>دسته‌بندی پیدا نشد.</CommandEmpty>
                      <CommandGroup heading="دسته‌بندی‌ها">
                        {CATEGORIES_DATA.map((item) => {
                          const isSelected = formData.categories.includes(
                            item.id,
                          );
                          return (
                            <CommandItem
                              key={item.id}
                              onSelect={() => toggleCategory(item.id)}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300"}`}
                                >
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <span className="font-medium">
                                  {item.label}
                                </span>
                                {item.parentLabel && (
                                  <span className="text-xs text-gray-400">
                                    ({item.parentLabel})
                                  </span>
                                )}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <FieldLabel>توضیحات و معرفی کوتاه</FieldLabel>
              <Textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="درباره خدمات، فضای مجموعه، تجهیزات و ویژگی‌های خاص خود بنویسید..."
              />
            </Field>
          </div>
        )}

        {/* ==================== مرحله ۲: ارتباطات ==================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-500" /> شماره همراه
                  مدیریت *
                </FieldLabel>
                <Input
                  type="tel"
                  dir="ltr"
                  className="text-left"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  placeholder="09123456789"
                />
              </Field>

              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" /> تلفن ثابت مجموعه
                </FieldLabel>
                <Input
                  type="tel"
                  dir="ltr"
                  className="text-left"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="021-12345678"
                />
              </Field>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  {/* <Instagram className="w-4 h-4 text-pink-600" /> پیج اینستاگرام */}
                </FieldLabel>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400 text-sm">
                    @
                  </span>
                  <Input
                    type="text"
                    dir="ltr"
                    className="text-left pl-8"
                    value={formData.instagram}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, instagram: e.target.value })
                    // }
                    placeholder="business_page"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" /> آدرس وب‌سایت
                </FieldLabel>
                <Input
                  type="url"
                  dir="ltr"
                  className="text-left"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </Field>
            </div>
          </div>
        )}

        {/* ==================== مرحله ۳: موقعیت مکانی ==================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" /> استان *
                </FieldLabel>
                <Input
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  placeholder="مثلاً: تهران"
                />
              </Field>

              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" /> شهر *
                </FieldLabel>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="مثلاً: تهران"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field className="md:col-span-1">
                <FieldLabel>محله</FieldLabel>
                <Input
                  value={formData.neighborhood}
                  onChange={(e) =>
                    setFormData({ ...formData, neighborhood: e.target.value })
                  }
                  placeholder="مثلاً: سعادت‌آباد"
                />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" /> آدرس دقیق پستی *
                </FieldLabel>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="خیابان ...، کوچه ...، پلاک ..."
                />
              </Field>
            </div>

            <Field>
              <FieldLabel className="flex items-center gap-2">
                <Map className="w-4 h-4 text-indigo-600" /> موقعیت دقیق روی نقشه
                (کلیک کنید)
              </FieldLabel>
              <div className="h-64 w-full rounded-xl overflow-hidden border z-0 relative">
                <MapContainer
                  center={[formData.latitude, formData.longitude]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker
                    position={[formData.latitude, formData.longitude]}
                    setPosition={(pos) =>
                      setFormData({
                        ...formData,
                        latitude: pos[0],
                        longitude: pos[1],
                      })
                    }
                  />
                </MapContainer>
              </div>
            </Field>
          </div>
        )}

        {/* ==================== مرحله ۴: امکانات و ساعات کاری ==================== */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <Field>
              <FieldLabel className="text-base font-semibold block mb-2">
                امکانات و خدمات مجموعه
              </FieldLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITIES_LIST.map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.amenities.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAmenity(item.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all text-right ${isSelected ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${isSelected ? "bg-indigo-600 text-white" : "border border-gray-300 bg-white"}`}
                      >
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
                <FieldLabel className="text-base font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" /> ساعات کاری
                </FieldLabel>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={formData.is24Hours}
                    onChange={(e) =>
                      setFormData({ ...formData, is24Hours: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-indigo-600"
                  />{" "}
                  فعالیت ۲۴ ساعته
                </label>
              </div>

              {!formData.is24Hours && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border">
                  <Field>
                    <FieldLabel>ساعت شروع کار</FieldLabel>
                    <Input
                      type="time"
                      dir="ltr"
                      value={formData.openTime}
                      onChange={(e) =>
                        setFormData({ ...formData, openTime: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>ساعت پایان کار</FieldLabel>
                    <Input
                      type="time"
                      dir="ltr"
                      value={formData.closeTime}
                      onChange={(e) =>
                        setFormData({ ...formData, closeTime: e.target.value })
                      }
                    />
                  </Field>
                </div>
              )}

              <Field>
                <FieldLabel className="mb-2 block">روزهای کاری هفته</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = formData.workingDays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => toggleWorkingDay(day.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${isSelected ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </div>
          </div>
        )}

        {/* ==================== مرحله ۵: تصاویر و گالری ==================== */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <Field>
              <FieldLabel className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-600" /> تصویر اصلی /
                کاور *
              </FieldLabel>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:bg-gray-50 transition-all relative">
                {formData.coverImage ? (
                  <div className="relative h-48 w-full rounded-xl overflow-hidden">
                    <img
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, coverImage: null })
                      }
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center py-6">
                    <Upload className="w-8 h-8 text-indigo-500 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      انتخاب تصویر اصلی کسب‌وکار
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverUpload}
                    />
                  </label>
                )}
              </div>
            </Field>

            <Field>
              <FieldLabel>آلبوم تصاویر محیط مجموعه</FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {formData.gallery.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative h-28 rounded-xl overflow-hidden border group"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-200 rounded-xl h-28 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500 font-medium">
                    افزودن عکس
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />
                </label>
              </div>
            </Field>
          </div>
        )}

        {/* دکمه‌های کنترل و جابه‌جایی استپ‌ها */}
        <div className="flex justify-between items-center pt-6 border-t mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              <ArrowRight className="w-4 h-4" /> مرحله قبل
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
            >
              مرحله بعد <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm"
            >
              ثبت نهایی کسب‌وکار <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
