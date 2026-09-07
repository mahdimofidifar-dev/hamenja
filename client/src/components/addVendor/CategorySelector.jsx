"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export const CATEGORIES_DATA = [
  { id: "entertainment", label: "تفریحی و سرگرمی", type: "main" },
  { id: "gamenet", label: "گیم‌نت", type: "sub", parentLabel: "تفریحی و سرگرمی" },
  { id: "escaperoom", label: "اتاق فرار", type: "sub", parentLabel: "تفریحی و سرگرمی" },
  { id: "ps5", label: "کلوپ بازی / PS5", type: "sub", parentLabel: "تفریحی و سرگرمی" },
  { id: "cafe", label: "کافه و رستوران", type: "main" },
  { id: "boardgame", label: "بردگیم کافه", type: "sub", parentLabel: "کافه و رستوران" },
];

export function CategorySelector({ value = [], onChange }) {
  const [open, setOpen] = useState(false);

  const toggleCategory = (id) => {
    const isSelected = value.includes(id);
    const newCategories = isSelected
      ? value.filter((catId) => catId !== id)
      : [...value, id];
    onChange(newCategories);
  };

  const removeCategory = (e, id) => {
    e.stopPropagation();
    onChange(value.filter((catId) => catId !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="w-full flex items-center justify-between min-h-[44px] p-2 border rounded-lg text-sm bg-white gap-2 flex-wrap text-right">
          <div className="flex flex-wrap gap-1.5 items-center">
            {value.length > 0 ? (
              value.map((id) => {
                const item = CATEGORIES_DATA.find((c) => c.id === id);
                if (!item) return null;
                return (
                  <span key={id} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs px-2 py-1 rounded-md font-medium">
                    {item.label}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={(e) => removeCategory(e, id)} />
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 p-1">جستجو یا انتخاب دسته‌بندی‌ها...</span>
            )}
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400 shrink-0 mr-auto" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="مثلاً: گیم‌نت، تفریحی..." />
          <CommandList>
            <CommandEmpty>دسته‌بندی پیدا نشد.</CommandEmpty>
            <CommandGroup heading="دسته‌بندی‌ها">
              {CATEGORIES_DATA.map((item) => {
                const isSelected = value.includes(item.id);
                return (
                  <CommandItem key={item.id} onSelect={() => toggleCategory(item.id)} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300"}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {item.parentLabel && <span className="text-xs text-gray-400">({item.parentLabel})</span>}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}