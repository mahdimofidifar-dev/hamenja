import { MapPin, Navigation } from "lucide-react";
const AddressBox = ({
  address = "اصفهان، خیابان چهارباغ عباسی، مجتمع تجاری پارت، طبقه اول",
  lat = 32.6546,
  lng = 51.668,
}) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return (
    <div className="w-full  p-5 shadow-lg flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl shrink-0 mt-0.5">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-600">نشانی دقیق</span>
          <p className="text-md font-semibold text-slate-400 leading-relaxed">
            {address}
          </p>
        </div>
      </div>
      <div className="relative size-full minh rounded-xl overflow-hidden border border-slate-400 group mx-auto">
        <iframe
          title="location-map"
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
          loading="lazy"
        />
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-md flex items-center gap-1.5 transition-colors pointer-events-auto"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>مسیریابی</span>
        </a>
      </div>
    </div>
  );
};
export default AddressBox;
