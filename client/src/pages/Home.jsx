import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryBox from "@/components/vendor/CategoryBox";
import SearchBox from "@/components/forms/SearchBox";
import { Coffee, Scissors, SquareOff } from "lucide-react";
import { useEffect, useState } from "react";
import { addCategories, getAllCategories } from "@/apis/category";
// import { CarouselY } from "@/components/ui/CarouselY";
export default function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Header />
      <div className="">
        <div className="w-full h-56 rounded-lg bg-brand-500 p-3 py-9 flex flex-col gap-2">
          <h1 className="text-2xl text-white">همینجا!؟</h1>
          <div className="des text-white">
            جست‌‌و‌جو در اطلاعات چندین کسب‌و‌کار محلی
          </div>
          <SearchBox />
        </div>
        {/* <div className="">
          <CarouselY className="w-full h-20" img={img} col="2" />
          <div class="w-72 h-48 overflow-hidden rounded-xl">
            <img
              src="/public/monarjonbon.jpeg"
              alt="خودرو"
              class="w-full h-full object-cover"
            />
          </div>
        </div> */}
        <div className="w-full flex flex-col p-3 gap-3">
          <h3 className="text-2xl">دسته بندی های محبوب</h3>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {categories.map((category) => {
              return (
                <CategoryBox
                  key={category._id}
                  url={category.uniqName}
                  icon={<SquareOff className="size-8" />}
                  title={category.title}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
