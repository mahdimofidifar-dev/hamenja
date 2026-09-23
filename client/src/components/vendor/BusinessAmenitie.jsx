const BusinessAmenities = ({ amenities = [] }) => {
  if (!amenities.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {amenities.map((item) => {
        if (!item) return null;

        return (
          <div
            key={item}
            className="flex items-center justify-center gap-3 rounded-xl border border-gray-100 bg-brand-100 p-3"
          >
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessAmenities;
