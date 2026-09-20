import mongoose from "mongoose";
import Business from "./models/Business.js";
import Category from "./models/Category.js";
import businessData from "./data/businesses.json" with { type: "json" };

await mongoose.connect(process.env.MONGO_URL);

const businesses = await Business.insertMany(businessData);

const categories = [
  ["آرایشگاه مردانه", "barbershop"],
  ["سالن زیبایی", "beauty-salon"],
  ["کافه", "cafe"],
  ["رستوران", "restaurant"],
  ["فست‌فود", "fast-food"],
  ["گیم‌نت", "gaming"],
  ["باشگاه ورزشی", "gym"],
  ["فروشگاه موبایل", "mobile-store"],
].map(([title, uniqName]) => ({
  title,
  uniqName,
  businesses: businesses
    .filter((business) => business.category === uniqName)
    .map((business) => business._id),
}));

await Category.insertMany(categories);

console.log("✅ Seed completed");

await mongoose.disconnect();
