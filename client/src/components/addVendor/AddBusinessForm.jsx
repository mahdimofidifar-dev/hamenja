"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Step1BaseInfo } from "./Step1BaseInfo";
import { Step2Contact } from "./Step2Contact";
import { Step3Location } from "./Step3Location";
import { Step4Amenities } from "./Step4Amenities";
import { Step5Gallery } from "./Step5Gallery";
import { addBusiness } from "../../apis/business.js";

const STEPS = [
  { id: 1, title: "اطلاعات پایه" },
  { id: 2, title: "ارتباطات" },
  { id: 3, title: "موقعیت مکانی" },
  { id: 4, title: "امکانات و زمان‌بندی" },
  { id: 5, title: "تصاویر" },
];

export default function AddBusinessForm() {
  const [currentStep, setCurrentStep] = useState(1);
  JSON.stringify({});
  const [formData, setFormData] = useState({
    uniqName: "",
    title: "گیم نت محله",
    categories: ["gamenet", "entertainment"],
    description: "گیمنت محل",
    mobile: "۰۹۳۵۶۲۷۹۰۹۹",
    phone: "۰۳۱۳۲۶۰۵۸۶۵",
    instagram: "kjsdkhf",
    website: "hamenja.ir",
    province: "اصفهان",
    city: "اصفهان",
    neighborhood: "شهرستان",
    address: "شهریتان خیابان بازارچه ",
    latitude: 35.65414545546027,
    longitude: 51.34685615857849,
    amenities: ["wifi", "cafe", "pos"],
    is24Hours: false,
    openTime: "09:00",
    closeTime: "23:00",
    workingDays: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهار‌شتبه",
      "پنج‌شنبه",
      "جمعه",
      "thu",
      "tue",
      "mon",
    ],
    coverImage: "",
    gallery: [""],
    // title: "",
    // categories: [],
    // description: "",
    // mobile: "",
    // phone: "",
    // instagram: "",
    // website: "",
    // province: "",
    // city: "",
    // neighborhood: "",
    // address: "",
    // latitude: 35.6892,
    // longitude: 51.389,
    // amenities: [],
    // is24Hours: false,
    // openTime: "09:00",
    // closeTime: "23:00",
    // workingDays: [
    //   "شنبه",
    //   "یکشنبه",
    //   "دوشنبه",
    //   "سه‌شنبه",
    //   "چهار‌شتبه",
    //   "پنج‌شنبه",
    //   "جمعه",
    // ],
    // coverImage: null,
    // gallery: [],
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = async () => {
      await addBusiness(formData);
    };
    sendData();
    console.log("دیتای نهایی ثبت شده:", formData);
    alert("کسب‌وکار با موفقیت ثبت شد!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-md border border-gray-100 my-8">
      <div className="mb-8">
        <div className="flex justify-between items-center relative z-10">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isCompleted ? "bg-indigo-600 text-white" : isCurrent ? "bg-indigo-600 text-white ring-4 ring-indigo-100" : "bg-gray-100 text-gray-400"}`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline-block ${isCurrent ? "text-indigo-600 font-bold" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <Step1BaseInfo formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 2 && (
          <Step2Contact formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 3 && (
          <Step3Location formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 4 && (
          <Step4Amenities formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 5 && (
          <Step5Gallery formData={formData} setFormData={setFormData} />
        )}

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

          {currentStep < 5 && (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
            >
              مرحله بعد <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {currentStep === 5 && (
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
