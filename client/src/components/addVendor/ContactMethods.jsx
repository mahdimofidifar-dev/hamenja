import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const CONTACT_TYPES = [
  {
    id: "instagram",
    label: "اینستاگرام",
    placeholder: "username",
  },
  {
    id: "telegram",
    label: "تلگرام",
    placeholder: "username",
  },
  {
    id: "whatsapp",
    label: "واتساپ",
    placeholder: "شماره یا لینک واتساپ",
  },
  {
    id: "eitaa",
    label: "ایتا",
    placeholder: "username",
  },
  {
    id: "rubika",
    label: "روبیکا",
    placeholder: "username",
  },
  {
    id: "website",
    label: "وب‌سایت",
    placeholder: "https://example.com",
  },
  {
    id: "other",
    label: "سایر",
    placeholder: "اطلاعات راه ارتباطی",
  },
];

export function ContactMethods({ socialLinks = [], setSocialLinks }) {
  const [selectedType, setSelectedType] = useState("");

  const availableTypes = useMemo(() => {
    const usedTypes = new Set(socialLinks.map((item) => item.type));

    return CONTACT_TYPES.filter((item) => !usedTypes.has(item.id));
  }, [socialLinks]);

  const addContactMethod = () => {
    if (!selectedType) return;

    const contactType = CONTACT_TYPES.find((item) => item.id === selectedType);

    if (!contactType) return;

    setSocialLinks((prev) => [
      ...prev,
      {
        type: contactType.id,
        value: "",
      },
    ]);

    setSelectedType("");
  };

  const updateContactMethod = (index, value) => {
    setSocialLinks((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              value,
            }
          : item,
      ),
    );
  };

  const removeContactMethod = (index) => {
    setSocialLinks((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const getContactType = (type) => {
    return CONTACT_TYPES.find((item) => item.id === type);
  };

  return (
    <div className="space-y-4">
      {/* Add contact method */}

      {availableTypes.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="
              h-10 flex-1 rounded-md
              border border-gray-200
              bg-white px-3
              text-sm text-gray-700
              outline-none
              transition
              focus:border-brand-500
              focus:ring-2
              focus:ring-brand-100
            "
          >
            <option value="">انتخاب راه ارتباطی</option>

            {availableTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={addContactMethod}
            disabled={!selectedType}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-md
              bg-brand-600
              px-4
              text-sm
              font-medium
              text-white
              transition
              hover:bg-brand-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Plus className="h-4 w-4" />
            افزودن
          </button>
        </div>
      )}

      {/* Contact methods */}

      {socialLinks.length > 0 && (
        <div className="space-y-3">
          {socialLinks.map((item, index) => {
            const contactType = getContactType(item.type);

            if (!contactType) return null;

            return (
              <div
                key={item.type}
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  p-3
                "
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {contactType.label}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeContactMethod(index)}
                    className="
                      rounded-md
                      p-1.5
                      text-gray-400
                      transition
                      hover:bg-red-50
                      hover:text-red-500
                    "
                    aria-label={`حذف ${contactType.label}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  dir="ltr"
                  value={item.value}
                  onChange={(e) => updateContactMethod(index, e.target.value)}
                  placeholder={contactType.placeholder}
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-3
                    text-sm
                    outline-none
                    transition
                    focus:border-brand-500
                    focus:ring-2
                    focus:ring-brand-100
                  "
                />
              </div>
            );
          })}
        </div>
      )}

      {socialLinks.length === 0 && (
        <p className="text-sm text-gray-400">
          هنوز راه ارتباطی دیگری اضافه نکرده‌اید.
        </p>
      )}

      {availableTypes.length === 0 && (
        <p className="text-sm text-gray-400">
          همه راه‌های ارتباطی موجود اضافه شده‌اند.
        </p>
      )}
    </div>
  );
}
