"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Phone, Smartphone, Globe } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export function Step2Contact({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-gray-500" /> شماره همراه مدیریت *
          </FieldLabel>
          <Input type="tel" dir="ltr" className="text-left" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} placeholder="09123456789" />
        </Field>

        <Field>
          <FieldLabel className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" /> تلفن ثابت مجموعه
          </FieldLabel>
          <Input type="tel" dir="ltr" className="text-left" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="021-12345678" />
        </Field>
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel className="flex items-center gap-2">
            <InstagramIcon className="w-4 h-4 text-pink-600" /> پیج اینستاگرام
          </FieldLabel>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400 text-sm">@</span>
            <Input type="text" dir="ltr" className="text-left pl-8" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} placeholder="business_page" />
          </div>
        </Field>

        <Field>
          <FieldLabel className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" /> آدرس وب‌سایت
          </FieldLabel>
          <Input type="url" dir="ltr" className="text-left" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://example.com" />
        </Field>
      </div>
    </div>
  );
}