import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Step1BaseInfo } from "./Step1BaseInfo";
import { Step2Contact } from "./Step2Contact";
import { Step3Location } from "./Step3Location";
import { Step4Amenities } from "./Step4Amenities";
import { Step5Gallery } from "./Step5Gallery";

import { addBusiness } from "@/apis/business";
import { useAuth } from "@/context/authContext";
import { businessSchema } from "@/validation/businessSchema";

const STEPS = [
  {
    id: 1,
    title: "اطلاعات پایه",
  },
  {
    id: 2,
    title: "ارتباطات",
  },
  {
    id: 3,
    title: "موقعیت مکانی",
  },
  {
    id: 4,
    title: "امکانات و زمان‌بندی",
  },
  {
    id: 5,
    title: "تصاویر",
  },
];

const INITIAL_FORM_DATA = {};

const STEP_FIELDS = {
  1: ["title", "uniqName", "category", "description"],
  2: ["mobile", "phone", "socialLinks"],
  3: ["province", "city", "neighborhood", "address", "latitude", "longitude"],
  4: ["amenities", "is24Hours", "workingHours"],
  5: ["logo", "gallery"],
};

export default function AddBusinessForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // تمام اطلاعات کسب‌وکار فقط در این state
  const [businessData, setBusinessData] = useState({
    uniqName: "",
    title: "",
    category: [],
    description: "",

    mobile: "",
    phone: "",
    socialLinks: [],

    province: "",
    city: "",
    neighborhood: "",
    address: "",

    latitude: null,
    longitude: null,

    amenities: [],

    is24Hours: false,

    workingHours: {
      sat: [],
      sun: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    },

    logo: null,
    gallery: [],
    ownerId: user?._id,
  });

  const validateStep = () => {
    const fields = STEP_FIELDS[currentStep];

    const stepSchema = businessSchema.pick(
      Object.fromEntries(fields.map((field) => [field, true])),
    );

    const stepData = Object.fromEntries(
      fields.map((field) => [field, businessData[field]]),
    );

    const result = stepSchema.safeParse(stepData);

    if (result.success) {
      return true;
    }

    const firstError = result.error.issues[0];

    toast.error(firstError.message);

    return false;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handlePrev = () => {
    if (loading) {
      return;
    }

    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const buildFormData = () => {
    const data = new FormData();

    data.append("uniqName", businessData.uniqName);
    data.append("title", businessData.title);
    data.append("description", businessData.description || "");

    data.append("category", JSON.stringify(businessData.category));

    data.append("mobile", businessData.mobile);
    data.append("phone", businessData.phone || "");

    data.append("socialLinks", JSON.stringify(businessData.socialLinks));

    data.append("province", businessData.province);
    data.append("city", businessData.city);

    data.append("neighborhood", businessData.neighborhood || "");

    data.append("address", businessData.address);

    data.append("latitude", String(businessData.latitude));

    data.append("longitude", String(businessData.longitude));

    data.append("amenities", JSON.stringify(businessData.amenities));

    data.append("is24Hours", String(businessData.is24Hours));

    data.append("workingHours", JSON.stringify(businessData.workingHours));

    data.append("ownerId", businessData.ownerId);

    if (businessData.logo?.file) {
      data.append("logo", businessData.logo.file);
    }

    businessData.gallery.forEach((image) => {
      if (image.file) {
        data.append("gallery", image.file);
      }
    });

    return data;
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    if (!user?._id) {
      toast.error("اطلاعات کاربر یافت نشد.");
      return;
    }

    try {
      setLoading(true);

      const payload = buildFormData();

      await addBusiness(payload);

      toast.success("کسب‌وکار با موفقیت ثبت شد.");

      navigate(-1);
    } catch (error) {
      console.error("Add business error:", error);

      toast.error("ثبت کسب‌وکار با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BaseInfo
            formData={businessData}
            setFormData={setBusinessData}
          />
        );

      case 2:
        return (
          <Step2Contact formData={businessData} setFormData={setBusinessData} />
        );

      case 3:
        return (
          <Step3Location
            formData={businessData}
            setFormData={setBusinessData}
          />
        );

      case 4:
        return (
          <Step4Amenities
            formData={businessData}
            setFormData={setBusinessData}
          />
        );

      case 5:
        return (
          <Step5Gallery formData={businessData} setFormData={setBusinessData} />
        );

      default:
        return null;
    }
  };

  const currentStepInfo = STEPS[currentStep - 1];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ثبت کسب‌وکار</h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات کسب‌وکار خود را وارد کنید تا صفحه اختصاصی شما در همینجا
            ساخته شود.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-8 overflow-x-auto  h-full p-2">
          <div className="flex min-w-max items-center justify-center">
            {STEPS.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full border-2
                        text-sm font-semibold
                        transition-all

                        ${
                          isCompleted
                            ? "border-brand-600 bg-brand-600 text-white"
                            : isCurrent
                              ? "border-brand-600 bg-white text-brand-600 ring-4 ring-brand-100"
                              : "border-gray-300 bg-white text-gray-400"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </div>

                    <span
                      className={`
                        mt-2 whitespace-nowrap
                        text-xs font-medium

                        ${
                          isCurrent
                            ? "text-brand-600"
                            : isCompleted
                              ? "text-gray-700"
                              : "text-gray-400"
                        }
                      `}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* Connector */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={`
                        mx-3 h-0.5
                        w-8 sm:w-12

                        ${
                          currentStep > step.id ? "bg-brand-600" : "bg-gray-200"
                        }
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          {/* Current Step Header */}
          <div className="mb-6">
            <p className="text-sm text-gray-400">
              مرحله {currentStep} از {STEPS.length}
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {currentStepInfo.title}
            </h2>
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">{renderCurrentStep()}</div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            {/* Previous */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1 || loading}
              className="
                inline-flex items-center
                gap-2 rounded-lg
                px-4 py-2.5
                text-sm font-medium
                text-gray-600
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:text-gray-300
              "
            >
              <ArrowRight className="h-4 w-4" />
              مرحله قبل
            </button>

            {/* Next */}
            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="
                  inline-flex items-center
                  gap-2 rounded-lg
                  bg-brand-600
                  px-5 py-2.5
                  text-sm font-medium
                  text-white
                  transition
                  hover:bg-brand-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                مرحله بعد
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  inline-flex items-center
                  gap-2 rounded-lg
                  bg-brand-600
                  px-5 py-2.5
                  text-sm font-medium
                  text-white
                  transition
                  hover:bg-brand-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? "در حال ثبت..." : "ثبت کسب‌وکار"}

                {!loading && <CheckCircle2 className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
