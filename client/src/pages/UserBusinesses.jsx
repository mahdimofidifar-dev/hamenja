import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash, Store } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { deleteBusiness } from "@/apis/business";

export const UserBusinesses = () => {
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) {
    return <>...</>;
  } else {

    const businesses = user.business || [];

    if (!businesses.length) {
      return (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 mt-4">
          <Link
            to="/profile"
            className="back w-full flex justify-center items-center text-xl h-20 bg-brand-100 mb-2"
          >
            بازگشت به پروفایل
          </Link>{" "}
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Store size={28} />
          </div>
          <h3 className="font-bold text-gray-800 mb-1">کسب‌وکاری یافت نشد</h3>
          <p className="text-sm text-gray-500 mb-4">
            می‌توانید کسب‌وکار خود را ثبت کنید تا دیگران آن را پیدا کنند.
          </p>
          <Link
            to="/add-business"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            + ثبت کسب‌وکار جدید
          </Link>
        </div>
      );
    }

    const deleteThisBusiness = async (id) => {
      const del = confirm("آیا از پاک کردن کسب و کار خود مطمعنید؟");
      del === true && (await deleteBusiness(id));
    };

    return (
      <div className="space-y-3 mt-4">
        <Link
          to="/profile"
          className="back w-full flex justify-center items-center text-xl h-20 bg-brand-100"
        >
          بازگشت به پروفایل
        </Link>

        <div className="flex justify-between items-center px-1">
          <span className="font-bold text-gray-700 text-sm">
            کسب‌وکارهای ثبت‌شده
          </span>
          <Link
            to="/add-business"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            + افزودن جدید
          </Link>
        </div>

        {businesses.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.coverImage || "/placeholder.png"}
                alt={item.title}
                className="w-14 h-14 object-cover rounded-xl bg-gray-100"
              />
              <div>
                <h4 className="font-bold text-gray-800 text-base">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {item.city}، {item.neighborhood || item.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to=""
                className="p-2  text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Pencil size={18} />
              </Link>
              <Link
                to={`/lists/${item.uniqName}`}
                className="p-2  text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Eye size={18} />
              </Link>
              <Link
                onClick={() => {
                  deleteThisBusiness(item._id);
                }}
                className="p-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
