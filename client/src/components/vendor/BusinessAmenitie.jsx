const AMENITIES = {
  parking: {
    label: "پارکینگ اختصاصی",
  },
  wifi: {
    label: "اینترنت Wi-Fi رایگان",
  },
  cafe: {
    label: "بوفه / کافه",
  },
  pos: {
    label: "دستگاه کارتخوان",
  },
  accessible: {
    label: "مناسب برای معلولین",
  },
  air_conditioning: {
    label: "سیستم تهویه",
  },
};

const BusinessAmenities = ({ amenities = [] }) => {
  if (!amenities.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {amenities.map((id) => {
        const amenity = AMENITIES[id];

        if (!amenity) return null;

        return (
          <div
            key={id}
            className="flex items-center justify-center gap-3 rounded-xl border border-gray-100 bg-brand-100 p-3"
          >
            <span className="text-sm text-gray-700">{amenity.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessAmenities;
