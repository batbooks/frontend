import React from "react";

export default function Card({ data }) {
  const { name, author, created_at } = data;

  const formatDate = (isoDate) => {
    if (!isoDate) return "تاریخ نامعلوم";
    
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return "تاریخ نامعتبر";
      
      return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    } catch (e) {
      console.error("Format date error:", e);
      return "تاریخ نامعتبر";
    }
  };

  return (
    <div className="flex flex-row-reverse gap-1.5 shadow-2xl w-xl h-50 bg-white ml-auto mt-4 rounded-2xl border border-[#e0e0e0] hover:scale-105 transition-all duration-250 hover:shadow-3xl hover:cursor-pointer">
      <div className="flex flex-col gap-2 w-full px-4 py-3">
        {/* عنوان با راست‌چین کامل */}
        <h1 className="text-right font-medium text-[24px] text-blue-900">
          {name || "بدون عنوان"}
        </h1>

        {/* اطلاعات نویسنده و تاریخ */}
        <div className="flex flex-row-reverse justify-between items-center w-full mt-2.5">
        <h4 className="text-[#333333] text-sm">
            ساخته شده در: {formatDate(created_at)}
          </h4>
          <h4 className="text-[#333333] text-sm">
            نویسنده: {author || "ناشناس"}
          </h4>
          
        </div>

        {/* توضیحات */}
        <div className="mt-2 text-right">
          <p className="text-justify leading-relaxed">
            توضیحات: این متن صرفاً جهت تست متن داخل توضیحات تالار می‌باشد.
          </p>
        </div>
      </div>
    </div>
  );
}