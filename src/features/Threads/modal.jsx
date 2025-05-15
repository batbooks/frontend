import React, { useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
//import persian from "react-date-object/calendars/persian";
//import persian_fa from "react-date-object/locales/persian_fa";

const CustomModal = ({ open, setOpen, handleSubmit, input1, setInput1 }) => {
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div dir="rtl" className="fixed w-full mx-auto inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-opacity-50">
      <div
        className="bg-[#a3d5ff] w-11/12 md:w-3/7 rounded-xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">ایجاد ترد جدید :</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="mb-2">موضوع ترد :</label>
            <textarea
              className="bg-white px-3 py-2 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:outline-none h-20"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </div>

          {/* <div className="flex flex-col mb-4">
            <label className="mb-2">نام نویسنده :</label>
            <input
              className="bg-white px-3 py-2 rounded-[10px] border border-gray-300 focus:border-blue-500 focus:outline-none"
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </div> */}

          {/* <div className="flex flex-col mb-6">
            <label className="mb-2">تاریخ (شمسی):</label>
            <DatePicker
              value={date}
              onChange={setDate}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              inputClass="w-full px-3 py-2 border bg-white border-gray-300 rounded-[10px] focus:border-blue-500 focus:outline-none"
            />
          </div> */}

          <div  className="flex flex-row gap-3">
            <button
              type="submit"
              className="bg-[#2663CD] cursor-pointer text-white px-6 py-2 rounded-[10px] shadow-md hover:bg-[#2663cd]/90 transition"
            >
              ایجاد
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-[#2663CD] cursor-pointer text-white px-6 py-2 rounded-[10px] shadow-md hover:bg-[#2663cd]/90 transition"
            >
              لغو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
