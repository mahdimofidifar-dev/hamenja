import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

const workingRangeSchema = z.object({
  open: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت شروع نامعتبر است."),

  close: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت پایان نامعتبر است."),
});

export const businessSchema = z.object({
  // -------------------------
  // Step 1
  // -------------------------

  title: z.string().trim().min(2, "نام کسب‌وکار باید حداقل ۲ کاراکتر باشد."),

  uniqName: z
    .string()
    .trim()
    .min(2, "آدرس صفحه کسب‌وکار را وارد کنید.")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "آدرس صفحه فقط می‌تواند شامل حروف انگلیسی، عدد، - و _ باشد.",
    ),

  category: z.array(z.string()).min(1, "حداقل یک دسته‌بندی انتخاب کنید."),

  description: optionalString,

  // -------------------------
  // Step 2
  // -------------------------

  mobile: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید به شکل 09123456789 باشد."),

  phone: optionalString,

  socialLinks: z.array(
    z.object({
      type: z.string().min(1),
      value: z.string().trim().min(1, "اطلاعات راه ارتباطی را وارد کنید."),
    }),
  ),

  // -------------------------
  // Step 3
  // -------------------------

  province: z.string().trim().min(1, "استان را وارد کنید."),

  city: z.string().trim().min(1, "شهر را وارد کنید."),

  neighborhood: optionalString,

  address: z.string().trim().min(5, "آدرس را کامل‌تر وارد کنید."),

  latitude: z
    .number()
    .min(-90, "موقعیت مکانی نامعتبر است.")
    .max(90, "موقعیت مکانی نامعتبر است."),

  longitude: z
    .number()
    .min(-180, "موقعیت مکانی نامعتبر است.")
    .max(180, "موقعیت مکانی نامعتبر است."),

  // -------------------------
  // Step 4
  // -------------------------

  amenities: z.array(z.string()),

  is24Hours: z.boolean(),

  workingHours: z.record(z.string(), z.array(workingRangeSchema)),

  // -------------------------
  // Step 5
  // -------------------------

  logo: z.any().nullable(),

  gallery: z.array(z.any()),

  // -------------------------
  // Owner
  // -------------------------

  ownerId: z.string().min(1, "کاربر وارد نشده است."),
});
