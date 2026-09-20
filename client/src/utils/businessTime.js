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
  console.log(is24Hours);

  const toMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const current = toMinutes(currentTime);
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  console.log(open, current);

  // ساعت باز و بسته شدن یکسان
  if (open === close) {
    return false;
  }

  // ساعت کاری از نیمه‌شب عبور می‌کند
  if (close < open) {
    return current >= open || current < close;
  }

  // ساعت کاری معمولی
  //   console.log(current >= open && current < close);

  return current >= open && current < close;
};
export const openInfo = (business) => {
  console.log(business);

  const isOpen = isBusinessOpen({
    openTime: business.openTime,
    closeTime: business.closeTime,
    is24Hours: business.is24Hours,
    currentTime: time,
  });
  console.log(isOpen);

  return isOpen;
};
export const toPersianDigits = (value) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
