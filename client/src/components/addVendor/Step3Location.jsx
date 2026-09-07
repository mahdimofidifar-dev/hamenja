"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Map } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
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
  return position === null ? null : <Marker position={position} icon={customIcon} />;
}

export function Step3Location({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel className="flex items-center gap-2"><Building2 className="w-4 h-4 text-gray-500" /> استان *</FieldLabel>
          <Input value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} placeholder="مثلاً: تهران" />
        </Field>

        <Field>
          <FieldLabel className="flex items-center gap-2"><Building2 className="w-4 h-4 text-gray-500" /> شهر *</FieldLabel>
          <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="مثلاً: تهران" />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field className="md:col-span-1">
          <FieldLabel>محله</FieldLabel>
          <Input value={formData.neighborhood} onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })} placeholder="مثلاً: سعادت‌آباد" />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> آدرس دقیق پستی *</FieldLabel>
          <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="خیابان ...، کوچه ...، پلاک ..." />
        </Field>
      </div>

      <Field>
        <FieldLabel className="flex items-center gap-2"><Map className="w-4 h-4 text-indigo-600" /> موقعیت دقیق روی نقشه (کلیک کنید)</FieldLabel>
        <div className="h-64 w-full rounded-xl overflow-hidden border z-0 relative">
          <MapContainer center={[formData.latitude, formData.longitude]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker position={[formData.latitude, formData.longitude]} setPosition={(pos) => setFormData({ ...formData, latitude: pos[0], longitude: pos[1] })} />
          </MapContainer>
        </div>
      </Field>
    </div>
  );
}