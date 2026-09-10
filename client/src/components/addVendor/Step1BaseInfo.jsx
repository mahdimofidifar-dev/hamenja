"use client";

import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "./CategorySelector";

export function Step1BaseInfo({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Field>
        <FieldLabel>نام کسب‌وکار / مجموعه *</FieldLabel>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="مثلاً: مجموعه تفریحی پرو اکسل"
        />
        <FieldDescription>
          نام اصلی که در کارت و بالاترین بخش نمایش داده می‌شود.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>نام کسب‌وکار / مجموعه به انگلیسی*</FieldLabel>
        <Input
          value={formData.uniqName}
          onChange={(e) =>
            setFormData({ ...formData, uniqName: e.target.value })
          }
          placeholder="مثلاً: hamenja"
        />
        <FieldDescription>
          نامی که برای آدرس صفحه شخصی کسب و کار شما نمایش و استفاده می شود{" "}
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>دسته‌بندی و حوزه فعالیت *</FieldLabel>
        <CategorySelector
          value={formData.categories}
          onChange={(newCategories) =>
            setFormData({ ...formData, categories: newCategories })
          }
        />
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
  );
}
