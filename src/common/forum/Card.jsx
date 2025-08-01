import React from "react";
import { useNavigate } from "react-router";

export default function Card({ data }) {
  const { id, name, author, created_at, text } = data;
  let navigate = useNavigate();

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
    <div
      onClick={() => {
        navigate(`/threadposts/${id}`, {
          state: { threadName: name, threadId: id },
        });
      }}
      className="mx-auto mb-3 flex flex-row-reverse gap-1.5 shadow-lg md:shadow-xl lg:shadow-2xl w-full sm:w-11/12 h-auto bg-white rounded-lg md:rounded-xl lg:rounded-2xl border border-[#e0e0e0] hover:scale-[1.01] sm:hover:scale-[1.02] lg:hover:scale-105 transition-all duration-250 hover:shadow-md md:hover:shadow-xl lg:hover:shadow-3xl hover:cursor-pointer"
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-2 lg:gap-2 w-full px-3 py-2 sm:px-4 sm:py-3">
        {/* عنوان با راست‌چین کامل */}
        <h1 className="text-right font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-blue-900">
          {name || "بدون عنوان"}
        </h1>

        {/* اطلاعات نویسنده و تاریخ */}
        <div className="flex flex-col sm:flex-row-reverse justify-between items-start sm:items-center w-full mt-1 sm:mt-1.5 md:mt-2 gap-1 sm:gap-2 md:gap-0">
          <h4 className="text-[#333333] text-xs sm:text-sm md:text-sm">
            ساخته شده در: {formatDate(created_at)}
          </h4>
          <h4 className="text-[#333333] text-xs sm:text-sm md:text-sm">
            <span className="font-semibold"> نویسنده: </span>
            {author || "ناشناس"}
          </h4>
        </div>

        {/* توضیحات */}
        <div className="mt-1 sm:mt-1.5 md:mt-2 text-right pb-10">
          <p className="text-justify leading-relaxed text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-3">
            <span className="font-semibold">توضیحات:</span> {text || "بدون توضیحات"}
          </p>
        </div>
      </div>
    </div>
  );
}