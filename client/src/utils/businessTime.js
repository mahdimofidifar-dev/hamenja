export const time = new Intl.DateTimeFormat("en-IR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}).format(new Date());

const isBusinessOpen = ({
  openTime,
  closeTime,
  is24Hours = false,
  currentTime,
}) => {
  if (is24Hours) return true;

  const toMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const current = toMinutes(currentTime);
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);

  // ساعت باز و بسته شدن یکسان
  if (open === close) {
    return false;
  }

  // ساعت کاری از نیمه‌شب عبور می‌کند
  if (close < open) {
    return current >= open || current < close;
  }

  // ساعت کاری معمولی
  return current >= open && current < close;
};
export const openInfo = (business) => {
  console.log(business.uniqName, business.openTime, business.closeTime, business.is24Hours);

  const isOpen = isBusinessOpen({
    openTime: business.openTime,
    closeTime: business.closeTime,
    is24Hours: business.is24Hours,
    currentTime: time,
  });

  return isOpen;
};
export const toPersianDigits = (value) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
