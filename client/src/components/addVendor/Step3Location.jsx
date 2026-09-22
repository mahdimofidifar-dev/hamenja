
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Building2, MapPin, Map, CheckCircle2 } from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  if (!position) return null;

  return <Marker position={position} icon={customIcon} />;
}

export function Step3Location({ formData, setFormData }) {
  const hasLocation =
    typeof formData.latitude === "number" &&
    typeof formData.longitude === "number";

  const position = hasLocation ? [formData.latitude, formData.longitude] : null;

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMapPosition = (pos) => {
    setFormData((prev) => ({
      ...prev,
      latitude: pos[0],
      longitude: pos[1],
    }));
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* اطلاعات شهری */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            آدرس کسب‌وکار
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            اطلاعات محل کسب‌وکار را وارد کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              استان <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              value={formData.province}
              onChange={(e) => updateField("province", e.target.value)}
              placeholder="مثلاً: اصفهان"
            />
          </Field>

          <Field>
            <FieldLabel className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              شهر <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="مثلاً: اصفهان"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Field className="md:col-span-1">
            <FieldLabel>
              محله{" "}
              <span className="text-xs font-normal text-gray-400">
                (اختیاری)
              </span>
            </FieldLabel>

            <Input
              value={formData.neighborhood}
              onChange={(e) => updateField("neighborhood", e.target.value)}
              placeholder="مثلاً: چهار باغ"
            />
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              آدرس دقیق <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="خیابان ...، کوچه ...، پلاک ..."
            />

            <FieldDescription>
              آدرس را تا حد امکان دقیق وارد کنید.
            </FieldDescription>
          </Field>
        </div>
      </div>

      {/* نقشه */}
      <Field>
        <div className="mb-3">
          <FieldLabel className="flex items-center gap-2">
            <Map className="h-4 w-4 text-brand-600" />
            موقعیت روی نقشه
            <span className="text-red-500">*</span>
          </FieldLabel>

          <FieldDescription>
            برای مشخص کردن محل دقیق کسب‌وکار، روی نقشه کلیک کنید.
          </FieldDescription>
        </div>

        <div className="relative h-72 w-full overflow-hidden rounded-xl border border-gray-200">
          {position ? (
            <div className="absolute right-3 top-3 z-[1000] flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-brand-700 shadow-md">
              <CheckCircle2 className="h-4 w-4" />
              موقعیت انتخاب شده
            </div>
          ) : (
            <div className="pointer-events-none absolute right-3 top-3 z-[1000] rounded-lg bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-md">
              روی نقشه کلیک کنید
            </div>
          )}

          <MapContainer
            center={position || [32.4279, 53.688]}
            zoom={position ? 13 : 5}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationMarker
              position={position}
              setPosition={handleMapPosition}
            />
          </MapContainer>
        </div>
      </Field>
    </div>
  );
}
