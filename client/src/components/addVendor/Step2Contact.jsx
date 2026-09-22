import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { ContactMethods } from "./ContactMethods";

export function Step2Contact({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Main contact */}

      <div>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-900">
            اطلاعات تماس
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            راه اصلی ارتباط مشتریان با کسب‌وکار خود را وارد کنید.
          </p>
        </div>

        <div className="space-y-5">
          {/* Mobile */}

          <Field>
            <FieldLabel>
              شماره موبایل <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              type="tel"
              dir="ltr"
              inputMode="numeric"
              value={formData.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              placeholder="09123456789"
            />

            <FieldDescription>
              این شماره به عنوان راه اصلی تماس نمایش داده می‌شود.
            </FieldDescription>
          </Field>

          {/* Phone */}

          <Field>
            <FieldLabel>
              تلفن ثابت
              <span className="mr-1 text-xs font-normal text-gray-400">
                (اختیاری)
              </span>
            </FieldLabel>

            <Input
              type="tel"
              dir="ltr"
              inputMode="numeric"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="03112345678"
            />
          </Field>
        </div>
      </div>

      {/* Social links */}

      <div>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-900">
            راه‌های ارتباطی دیگر
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            هر شبکه اجتماعی یا راه ارتباطی که کسب‌وکارتان در آن فعال است اضافه
            کنید.
          </p>
        </div>

        <ContactMethods
          socialLinks={formData.socialLinks}
          setSocialLinks={(value) => {
            setFormData((prev) => ({
              ...prev,
              socialLinks:
                typeof value === "function" ? value(prev.socialLinks) : value,
            }));
          }}
        />
      </div>
    </div>
  );
}
