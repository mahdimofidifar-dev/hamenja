"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Upload, Image as ImageIcon, X } from "lucide-react";

export function Step5Gallery({ formData, setFormData }) {
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
      setFormData({ ...formData, gallery: [...formData.gallery, ...newImages] });
    }
  };

  const removeGalleryImage = (index) => {
    const updated = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updated });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Field>
        <FieldLabel className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-indigo-600" /> تصویر اصلی / کاور *</FieldLabel>
        <div className="mt-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:bg-gray-50 transition-all relative">
          {formData.coverImage ? (
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button type="button" onClick={() => setFormData({ ...formData, coverImage: null })} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center py-6">
              <Upload className="w-8 h-8 text-indigo-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">انتخاب تصویر اصلی کسب‌وکار</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </label>
          )}
        </div>
      </Field>

      <Field>
        <FieldLabel>آلبوم تصاویر محیط مجموعه</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {formData.gallery.map((imgUrl, index) => (
            <div key={index} className="relative h-28 rounded-xl overflow-hidden border group">
              <img src={imgUrl} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="border-2 border-dashed border-gray-200 rounded-xl h-28 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
            <Upload className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500 font-medium">افزودن عکس</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
          </label>
        </div>
      </Field>
    </div>
  );
}