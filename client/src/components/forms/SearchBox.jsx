import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search,
  Clock,
  MapPin,
  Star,
  Building2,
  Sparkles,
  X,
  Tag,
  Command as CommandIcon,
  ArrowUpLeft,
  CalendarClock,
  Trash2,
} from "lucide-react";
import { getAllBusiness } from "@/apis/business";
import { Link } from "react-router-dom";
import { getAllCategories } from "@/apis/category";

const LOCATIONS = [
  { id: "l1", type: "location", name: "تهران - سعادت‌آباد", count: 214 },
  { id: "l2", type: "location", name: "تهران - ونک", count: 189 },
  { id: "l3", type: "location", name: "تهران - نیاوران", count: 152 },
  { id: "l4", type: "location", name: "تهران - پونک", count: 118 },
  { id: "l5", type: "location", name: "اصفهان - چهارباغ", count: 97 },
  { id: "l6", type: "location", name: "شیراز - معالی‌آباد", count: 63 },
];

function matches(query, ...fields) {
  const q = query
    .replace(/[یي]/g, "ی")
    .replace(/[کك]/g, "ک")
    .replace(/\u200c/g, " ")
    .trim()
    .toLowerCase();
  if (!q) return false;
  return fields.some((f) => f.includes(q));
}

function SearchBox({
  placeholder = "جستجوی کسب‌وکار، خدمت یا شهر…",
  onSelect,
  className,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBusiness();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // /* ---- فوکوس خودکار روی اینپوت هنگام باز شدن ---- */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    } else {
      setQuery("");
    }
  }, [open]);

  /* ---- فیلتر کردن نتایج ---- */
  const filteredBusinesses = useMemo(() => {
    if (!query.trim()) return [];
    return businesses
      .filter((business) =>
        matches(query, business.title, business.category, business.city),
      )
      .slice(0, 3);
  }, [query]);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return [];
    return categories
      .filter((category) => matches(query, category.title))
      .slice(0, 3);
  }, [query]);

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return [];
    return LOCATIONS.filter((location) => matches(query, location.name)).slice(
      0,
      3,
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasResults =
    filteredBusinesses.length > 0 ||
    filteredCategories.length > 0 ||
    filteredLocations.length > 0;

  /* ---- لیست مسطح‌شده برای ناوبری با کیبورد ---- */
  const flatList = useMemo(() => {
    if (!hasQuery) {
      return recent.map((r) => ({ kind: "recent", ...r }));
    }
    return [
      ...filteredBusinesses.map((v) => ({ kind: "vendor", ...v })),
      ...filteredCategories.map((category) => ({
        kind: "category",
        ...category,
      })),
      ...filteredLocations.map((l) => ({ kind: "location", ...l })),
    ];
  }, [
    hasQuery,
    recent,
    filteredBusinesses,
    filteredCategories,
    filteredLocations,
  ]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  /* ---- انتخاب یک آیتم ---- */
  const handleSelectItem = useCallback(
    (item) => {
      if (!item) return;
      const label =
        item.kind === "recent"
          ? item.label
          : item.kind === "vendor"
            ? item.title
            : item.title;

      setRecent((prev) => {
        const withoutDup = prev.filter((r) => r.label !== label);
        return [{ id: `r-${Date.now()}`, label }, ...withoutDup].slice(0, 6);
      });

      onSelect?.(item);
      setOpen(false);
    },
    [onSelect],
  );

  const removeRecent = useCallback((id, e) => {
    e.stopPropagation();
    setRecent((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const clearAllRecent = useCallback((e) => {
    e.stopPropagation();
    setRecent([]);
  }, []);

  /* ---- ناوبری کیبورد داخل پنل ---- */
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatList[activeIndex];
      if (item) handleSelectItem(item);
    }
  }

  let runningIndex = -1;

  return (
    <div className={className}>
      {/* ---------- دکمه/ورودی محرک ---------- */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-md border border-brand-300 bg-white px-4 h-14 text-right shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
      >
        <Search className="size-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-500 " />
        <span className="flex-1 truncate text-sm text-slate-400 ">
          {placeholder}
        </span>
      </button>

      {/* ---------- پنل شناور (Overlay) ---------- */}
      {open && (
        <div
          className="psb-overlay fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 px-4 pt-[8vh] backdrop-blur-sm "
          onClick={() => setOpen(false)}
        >
          <div
            className="psb-panel w-full max-w-xl overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-2xl ring-1 ring-black/5 "
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* ---- نوار جستجو ---- */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 ">
              <Search className="h-[18px] w-[18px] shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="نام کسب‌وکار، خدمت یا شهر را وارد کنید…"
                className="h-14 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none  -500"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 "
                  aria-label="پاک کردن جستجو"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="hidden shrink-0 rounded-md border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-400 sm:block"
              >
                Esc
              </button>
            </div>

            {/* ---- بدنه نتایج ---- */}
            <div
              ref={listRef}
              className="psb-scroll max-h-[60vh] overflow-y-auto p-2"
            >
              {/* حالت بدون کوئری: تاریخچه جستجو */}
              {!hasQuery && (
                <div className="px-1 py-1">
                  <div className="flex items-center justify-between px-2 pb-1.5 pt-2">
                    <span className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400 ">
                      <Clock className="h-3.5 w-3.5" />
                      جستجوهای اخیر
                    </span>
                    {recent.length > 0 && (
                      <button
                        onClick={clearAllRecent}
                        className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-slate-400 transition-colors hover:bg-brand-200 hover:text-rose-500 "
                      >
                        <Trash2 className="h-3 w-3" />
                        پاک کردن همه
                      </button>
                    )}
                  </div>

                  {recent.length === 0 && (
                    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                      <Clock className="h-7 w-7 text-slate-300 " />
                      <p className="text-sm text-slate-400 ">
                        هنوز جستجویی ثبت نشده است
                      </p>
                    </div>
                  )}

                  {recent.map((r, idx) => {
                    runningIndex += 1;
                    const isActive = runningIndex === activeIndex;
                    return (
                      <div
                        key={r.id}
                        ref={(el) => (itemRefs.current[runningIndex] = el)}
                        onMouseEnter={() => setActiveIndex(runningIndex)}
                        onClick={() =>
                          handleSelectItem({ kind: "recent", ...r })
                        }
                        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-brand-200 "
                            : "hover:bg-slate-50 -800/60"
                        }`}
                      >
                        <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                        <span className="flex-1 truncate text-slate-700 ">
                          {r.label}
                        </span>
                        <button
                          onClick={(e) => removeRecent(r.id, e)}
                          className="rounded-full p-1 text-slate-300 opacity-0 transition-all hover:bg-slate-200 hover:text-slate-600 group-hover:opacity-100 -700"
                          style={{ opacity: isActive ? 1 : undefined }}
                          aria-label="حذف از تاریخچه"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* حالت با کوئری، بدون نتیجه */}
              {hasQuery && !hasResults && (
                <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 ">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600 ">
                    کسب‌وکار یا خدمتی با این نام پیدا نشد
                  </p>
                  <p className="text-xs text-slate-400 ">
                    املای عبارت را بررسی کنید یا کلمه‌ی دیگری را امتحان کنید
                  </p>
                </div>
              )}

              {/* حالت با کوئری و نتیجه: گروه‌بندی شده */}
              {hasQuery && hasResults && (
                <div className="flex flex-col gap-1">
                  {filteredBusinesses.length > 0 && (
                    <ResultGroup
                      icon={<Building2 className="h-3.5 w-3.5" />}
                      title="کسب‌وکارها و مراکز"
                    >
                      {filteredBusinesses.map((v) => {
                        runningIndex += 1;
                        const isActive = runningIndex === activeIndex;
                        return (
                          <VendorRow
                            url={`${v.uniqName}`}
                            key={v._id}
                            itemRef={(el) =>
                              (itemRefs.current[runningIndex] = el)
                            }
                            vendor={v}
                            isActive={isActive}
                            onHover={() => setActiveIndex(runningIndex)}
                            onClick={() =>
                              handleSelectItem({ kind: "vendor", ...v })
                            }
                          />
                        );
                      })}
                    </ResultGroup>
                  )}

                  {filteredCategories.length > 0 && (
                    <ResultGroup
                      icon={<Tag className="h-3.5 w-3.5" />}
                      title="دسته‌بندی خدمات"
                    >
                      {filteredCategories.map((c) => {
                        runningIndex += 1;
                        const isActive = runningIndex === activeIndex;
                        return (
                          <SimpleRow
                            key={c._id}
                            itemRef={(el) =>
                              (itemRefs.current[runningIndex] = el)
                            }
                            icon={
                              <Sparkles className="h-4 w-4 text-violet-400" />
                            }
                            title={c.title}
                            // subtitle={`${c.count.toLocaleString("fa-IR")} کسب‌وکار`}
                            isActive={isActive}
                            onHover={() => setActiveIndex(runningIndex)}
                            onClick={() =>
                              handleSelectItem({ kind: "categories", ...c })
                            }
                            category={c.uniqName}
                          />
                        );
                      })}
                    </ResultGroup>
                  )}

                  {filteredLocations.length > 0 && (
                    <ResultGroup
                      icon={<MapPin className="h-3.5 w-3.5" />}
                      title="شهرها / مناطق"
                    >
                      {filteredLocations.map((l) => {
                        runningIndex += 1;
                        const isActive = runningIndex === activeIndex;
                        return (
                          <SimpleRow
                            key={l.id}
                            itemRef={(el) =>
                              (itemRefs.current[runningIndex] = el)
                            }
                            icon={
                              <MapPin className="h-4 w-4 text-emerald-400" />
                            }
                            title={l.name}
                            subtitle={`${l.count.toLocaleString("fa-IR")} نتیجه`}
                            isActive={isActive}
                            onHover={() => setActiveIndex(runningIndex)}
                            onClick={() =>
                              handleSelectItem({ kind: "location", ...l })
                            }
                          />
                        );
                      })}
                    </ResultGroup>
                  )}
                </div>
              )}
            </div>

            {/* ---- پاورقی راهنمای کیبورد ---- */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-400  ">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 px-1.5 py-0.5 ">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-slate-200 px-1.5 py-0.5 ">
                    ↓
                  </kbd>
                  جابه‌جایی
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 px-1.5 py-0.5 ">
                    Enter
                  </kbd>
                  انتخاب
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-slate-200 px-1.5 py-0.5 ">
                  Esc
                </kbd>
                بستن
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   ساب‌کامپوننت‌ها
   ========================================================================= */

function ResultGroup({ icon, title, children }) {
  return (
    <div className="px-1 py-1">
      <div className="flex items-center gap-1.5 px-2 pb-1.5 pt-2 text-[12px] font-medium text-slate-400 ">
        {icon}
        {title}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function SimpleRow({
  category,
  itemRef,
  icon,
  title,
  subtitle,
  isActive,
  onHover,
  onClick,
}) {
  return (
    <Link
      to={`/${category}`}
      ref={itemRef}
      onMouseEnter={onHover}
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
        isActive ? "bg-slate-100 " : "hover:bg-slate-50 -800/60"
      }`}
    >
      {icon}
      <div className="flex flex-1 flex-col">
        <span className="text-slate-700 ">{title}</span>
        {subtitle && (
          <span className="text-[11px] text-slate-400 ">{subtitle}</span>
        )}
      </div>
      {isActive && (
        <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 text-slate-300" />
      )}
    </Link>
  );
}

function VendorRow({ itemRef, vendor, isActive, onHover, onClick, url }) {
  return (
    <Link
      to={`/businesses/${url}`}
      ref={itemRef}
      onMouseEnter={onHover}
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
        isActive ? "bg-slate-100 " : "hover:bg-slate-50 -800/60"
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-500 /10 /10 ">
        <Building2 className="h-4 w-4" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-medium text-slate-700 ">
            {vendor.title}
          </span>
          {vendor.badge && (
            <span className="shrink-0 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 /10 ">
              {vendor.badge}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-slate-400 ">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {vendor.rate.toLocaleString("fa-IR")}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {vendor.city}
          </span>
          <span className="flex items-center gap-1 text-emerald-500">
            <CalendarClock className="h-3 w-3" />
            {vendor.nextSlot}
          </span>
        </div>
      </div>

      {isActive && (
        <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 text-slate-300" />
      )}
    </Link>
  );
}
export default SearchBox;
