import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryBox from "@/components/vendor/CategoryBox";
import SearchBox from "@/components/forms/SearchBox";
import { Coffee, Scissors, SquareOff } from "lucide-react";
// import { CarouselY } from "@/components/ui/CarouselY";
import { getUsers } from "../apis/users.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Header />
      <div className="">
        <div className="w-full h-56 rounded-lg bg-brand-500 p-3 py-9 flex flex-col gap-2">
          <h1 className="text-2xl text-white">platform</h1>
          <div className="des text-white">
            جست‌‌و‌جو در اطلاعات چندین کسب‌و‌کار محلی
          </div>
          <SearchBox />
        </div>
        {/* <div className="">{user}</div> */}
        {/* {user.map((item) => {
          <div className="">{item}</div>;
        })} */}
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
            <CategoryBox
              icon={<Coffee className="size-8" />}
              title="کافی شاپ"
            />
            <CategoryBox
              icon={<Scissors className="size-8" />}
              title="آرایشگاه"
            />
            {/* <CategoryBox icon={<SquareOff className="size-8" />} />
            <CategoryBox icon={<SquareOff className="size-8" />} />
            <CategoryBox icon={<SquareOff className="size-8" />} />
            <CategoryBox icon={<SquareOff className="size-8" />} />
            <CategoryBox icon={<SquareOff className="size-8" />} />
            <CategoryBox icon={<SquareOff className="size-8" />} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
