import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CardBox from "@/components/vendor/CardBoxVendor";
import FilterBar from "@/components/forms/FilterBar";

import SearchBox from "@/components/forms/SearchBox";
import { Map } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllBusiness } from "../../api/business.js";

const Listing = () => {
  const [business, setBusiness] = useState([]);
  useEffect(() => {
    let data = null;
    const fetchData = async () => {
      data = await getAllBusiness();
      setBusiness(data);
    };
    fetchData();
  }, []);
  console.log(business);

  return (
    <div className="flex flex-col gap-3">
      <Header />
      <div className="px-3">
        <div className="head">
          <div className="search-box p-3 flex gap-2">
            <SearchBox className="w-[80%]" />
            <button className="map flex text-sm text-bran-400 justify-center items-center w-[20%] items-center gap-3 rounded-md border border-brand-300 bg-white/80 px-4 py-3 text-right shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
              <Map className="size-5" /> نقشه
            </button>
          </div>
          <FilterBar />
        </div>
        <div className="list-title p-3 border w-fit rounded-2xl my-2">
          آرایشگاه های مردانه
        </div>
        <div className="lists flex flex-col gap-4">
          {business.map((item) => {
            console.log(item);
            return <CardBox key={item.id} props={item} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Listing;
