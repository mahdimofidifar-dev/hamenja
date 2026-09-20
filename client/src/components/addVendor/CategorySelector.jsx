import { useEffect, useState } from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { getAllCategories } from "@/apis/category";

export function CategorySelector({ value = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const toggleCategory = (uniqName) => {
    const isSelected = value.includes(uniqName);

    const newCategories = isSelected
      ? value.filter((cat) => cat !== uniqName)
      : [...value, uniqName];

    onChange(newCategories);
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await getAllCategories();

      setCategories(data);
      setLoading(false);
    };

    getCategories();
  }, []);

  const removeCategory = (e, uniqName) => {
    e.stopPropagation();

    onChange(value.filter((cat) => cat !== uniqName));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between min-h-11 p-2 border rounded-lg text-sm bg-white gap-2 flex-wrap text-right"
        >
          <div className="flex flex-wrap gap-1.5 items-center">
            {value.length > 0 ? (
              value.map((uniqName) => {
                const item = categories.find(
                  (category) => category.uniqName === uniqName,
                );

                if (!item) return null;

                return (
                  <span
                    key={uniqName}
                    className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs px-2 py-1 rounded-md font-medium"
                  >
                    {item.title}

                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={(e) => removeCategory(e, uniqName)}
                    />
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 p-1">
                جستجو یا انتخاب دسته‌بندی‌ها...
              </span>
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
              {categories.map((item) => {
                const isSelected = value.includes(item.uniqName);

                return (
                  <CommandItem
                    key={item._id}
                    onSelect={() => toggleCategory(item.uniqName)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>

                      <span className="font-medium">{item.title}</span>

                      {item.parentLabel && (
                        <span className="text-xs text-gray-400">
                          ({item.parentLabel})
                        </span>
                      )}
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
