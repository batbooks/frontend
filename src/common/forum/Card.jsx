import React from "react";
import { useNavigate } from "react-router";

export default function Card({ data }) {
  const { id, name, author, created_at } = data;
  let navigate = useNavigate();
  console.log(data);
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
      className="mx-auto flex flex-row-reverse gap-1.5 shadow-lg md:shadow-2xl w-11/12 h-auto md:h-50 bg-white ml-auto mt-3 md:mt-4 rounded-xl md:rounded-2xl border border-[#e0e0e0] hover:scale-[1.02] md:hover:scale-105 transition-all duration-250 hover:shadow-xl md:hover:shadow-3xl hover:cursor-pointer"
    >
      <div className="flex flex-col gap-10 md:gap-2 w-full px-3 py-2 md:px-4 md:py-3">
        {/* عنوان با راست‌چین کامل */}
        <h1 className="text-right font-bold text-lg md:text-[24px] text-blue-900">
          {name || "بدون عنوان"}
        </h1>

        {/* اطلاعات نویسنده و تاریخ */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center w-full mt-1 md:mt-2.5 gap-1 md:gap-0">
          <h4 className="text-[#333333] text-xs md:text-sm">
            ساخته شده در: {formatDate(created_at)}
          </h4>
          <h4 className="text-[#333333] text-xs md:text-sm">
            <span className="font-semibold"> نویسنده: </span>{" "}
            {author || "ناشناس"}
          </h4>
        </div>

        {/* توضیحات */}
        <div className="mt-1 md:mt-2 text-right">
          <p className="text-justify leading-relaxed text-sm md:text-base">
            <span className="font-semibold">توضیحات:</span> {data.text}
          </p>
        </div>
      </div>
    </div>
  );
}