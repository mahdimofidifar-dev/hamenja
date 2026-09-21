import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CardBox from "@/components/vendor/CardBoxVendor";
import FilterBar from "@/components/forms/FilterBar";
import { getAllBusinessOfCategory } from "../apis/business.js";
import SearchBox from "@/components/forms/SearchBox";
import { Map } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory } from "@/apis/category.js";
const Listing = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getAllBusinessOfCategory(category);
        setBusiness(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategory(category);
        setCategoryInfo(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Header />
      {loading === false ? (
        <div className="px-3">
          <div className="head">
            <div className="search-box p-3 flex gap-2">
              <SearchBox className="w-full" />
              {/* <button className="map flex text-sm text-bran-400 justify-center w-[20%] items-center gap-3 rounded-md border border-brand-300 bg-white/80 px-4 py-3 text-right shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                <Map className="size-5" /> نقشه
              </button> */}
            </div>
            <FilterBar />
          </div>
          <div className="list-title p-3 border w-fit rounded-2xl my-2">
            {categoryInfo.title}
          </div>
          <div className="lists flex flex-col gap-4">
            {business.map((item) => {
              return <CardBox key={item._id} props={item} />;
            })}
          </div>
        </div>
      ) : (
        <div>...</div>
      )}

      <Footer />
    </div>
  );
};
export default Listing;
