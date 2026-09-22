import { useRef } from "react";

import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Upload, Image as ImageIcon, X } from "lucide-react";

const MAX_GALLERY_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const validateImage = (file) => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "فقط تصاویر JPG، PNG و WebP قابل قبول هستند.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "حجم هر تصویر نباید بیشتر از ۵ مگابایت باشد.";
  }

  return null;
};

export function Step5Gallery({ formData, setFormData }) {
  const logoInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const error = validateImage(file);

    if (error) {
      alert(error);
      e.target.value = "";
      return;
    }

    setFormData((prev) => {
      if (prev.logo?.preview) {
        URL.revokeObjectURL(prev.logo.preview);
      }

      return {
        ...prev,
        logo: {
          file,
          preview: URL.createObjectURL(file),
        },
      };
    });

    e.target.value = "";
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const remainingSlots = MAX_GALLERY_IMAGES - formData.gallery.length;

    if (remainingSlots <= 0) {
      alert(`حداکثر ${MAX_GALLERY_IMAGES} تصویر می‌توانید اضافه کنید.`);

      e.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    const validFiles = [];
    const errors = [];

    selectedFiles.forEach((file) => {
      const error = validateImage(file);

      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    if (validFiles.length > 0) {
      const newImages = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newImages],
      }));
    }

    e.target.value = "";
  };

  const removeLogo = () => {
    setFormData((prev) => {
      if (prev.logo?.preview) {
        URL.revokeObjectURL(prev.logo.preview);
      }

      return {
        ...prev,
        logo: null,
      };
    });

    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => {
      const image = prev.gallery[index];

      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }

      return {
        ...prev,
        gallery: prev.gallery.filter((_, imageIndex) => imageIndex !== index),
      };
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* =========================
          Logo
      ========================= */}

      <Field>
        <div className="mb-3">
          <FieldLabel className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-brand-600" />
            لوگو کسب‌وکار
          </FieldLabel>

          <FieldDescription>
            لوگوی اصلی کسب‌وکار را با فرمت JPG، PNG یا WebP بارگذاری کنید.
          </FieldDescription>
        </div>

        <div
          className="
            overflow-hidden rounded-2xl border-2
            border-dashed border-gray-200
            bg-gray-50/50 p-3
            transition hover:border-gray-300
          "
        >
          {formData.logo ? (
            <div className="relative h-52 overflow-hidden rounded-xl bg-white">
              <img
                src={formData.logo.preview}
                alt="پیش‌نمایش لوگو"
                className="h-full w-full object-contain"
              />

              <button
                type="button"
                onClick={removeLogo}
                className="
                  absolute right-2 top-2
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-red-600 text-white
                  shadow-sm transition
                  hover:bg-red-700
                "
                aria-label="حذف لوگو"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              className="
                flex cursor-pointer flex-col
                items-center justify-center
                rounded-xl py-10
                transition hover:bg-gray-100
              "
            >
              <div
                className="
                  mb-3 flex h-12 w-12
                  items-center justify-center
                  rounded-full bg-brand-50
                "
              >
                <Upload className="h-6 w-6 text-brand-600" />
              </div>

              <span className="text-sm font-medium text-gray-700">
                انتخاب لوگو
              </span>

              <span className="mt-1 text-xs text-gray-400">
                حداکثر ۵ مگابایت
              </span>

              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
          )}
        </div>
      </Field>

      {/* =========================
          Gallery
      ========================= */}

      <Field>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <FieldLabel className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-brand-600" />
              تصاویر محیط مجموعه
            </FieldLabel>

            <FieldDescription>
              تصاویری از محیط، فضا و امکانات کسب‌وکار اضافه کنید.
            </FieldDescription>
          </div>

          <span className="shrink-0 text-xs text-gray-400">
            {formData.gallery.length} / {MAX_GALLERY_IMAGES}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {formData.gallery.map((image, index) => (
            <div
              key={`${image.file?.name}-${index}`}
              className="
                group relative aspect-square
                overflow-hidden rounded-xl
                border border-gray-200 bg-gray-50
              "
            >
              <img
                src={image.preview}
                alt={`تصویر ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {/* شماره تصویر */}
              <span
                className="
                  absolute bottom-2 right-2
                  rounded-md bg-black/60
                  px-2 py-1 text-xs
                  font-medium text-white
                "
              >
                {index + 1}
              </span>

              {/* حذف */}
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="
                  absolute right-2 top-2
                  flex h-8 w-8 items-center justify-center
                  rounded-full bg-red-600
                  text-white shadow-sm
                  transition hover:bg-red-700
                "
                aria-label={`حذف تصویر ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Add button */}
          {formData.gallery.length < MAX_GALLERY_IMAGES && (
            <label
              className="
                flex aspect-square cursor-pointer
                flex-col items-center justify-center
                rounded-xl border-2 border-dashed
                border-gray-200 bg-gray-50/50
                transition hover:border-brand-300
                hover:bg-brand-50/30
              "
            >
              <Upload className="mb-2 h-6 w-6 text-gray-400" />

              <span className="text-xs font-medium text-gray-500">
                افزودن عکس
              </span>

              <span className="mt-1 text-[10px] text-gray-400">
                JPG / PNG / WebP
              </span>

              <input
                ref={galleryInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleGalleryUpload}
              />
            </label>
          )}
        </div>

        <p className="mt-3 text-xs leading-5 text-gray-400">
          حداکثر {MAX_GALLERY_IMAGES} تصویر و حداکثر ۵ مگابایت برای هر تصویر.
        </p>
      </Field>
    </div>
  );
}
