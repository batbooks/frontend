import { useState } from "react";

export default function ReadingGoalCard() {
  const [bookNum, setBookNum] = useState(100);

  return (
    <div
      dir="ltr"
      className="h-fit flex flex-col w-[243px] bg-[#001F54] py-[94px] px-[29px] rounded-[20px] border-[#000000]/60 border-[2px] items-center text-center"
    >
      <h2 className="text-[#DDDDDD] font-[600] text-[12px] mb-[12px]">
        چالش کتابخوانی
      </h2>
      <p className="text-[#DDDDDD] font-[300] text-[12px] mb-[27px]">
        امسال برای کتابخوانی
        <br />
        هدفگذاری کن
      </p>
      <div className="bg-[#A4C0ED] rounded-[15px] mb-[26px]">
        <img src="/src/assets/images/reading_challenge.png" alt="challenge" />
      </div>
      <p className="text-[12px] font-[300] text-[#DDDDDD] text-nowrap mb-[5px]">
        تعداد کتاب هایی که امسال قراره بخونم
      </p>
      <div className="flex items-center gap-[11px] bg-white py-[7px] px-[6px] rounded-[10px] mb-[15px]">
        <button
          className="cursor-pointer rounded-full"
          onClick={() => (bookNum !== 100 ? setBookNum(bookNum + 1) : null)}
        >
          <img src="/src/assets/images/plus.png" alt="plus" />
        </button>
        <span>{bookNum}</span>
        <button
          className="cursor-pointer rounded-full"
          onClick={() => (bookNum !== 0 ? setBookNum(bookNum - 1) : null)}
        >
          <img src="/src/assets/images/minus.png" alt="minus" />
        </button>
      </div>
      <p className="text-[12px] font-[300] text-[#DDDDDD] mb-[27px]">
        میتوانی هدفگذاری ات را هر زمان که
        <br />
        بخواهی تغییر دهی
      </p>
      <span className="text-[12px] font-[600] text-[#DDDDDD] mb-[23px]">
        :کتاب هایی که
      </span>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center text-[#DDDDDD] text-[12px] font-[300] gap-[90px]">
          <span>قراره بخونم</span>
          <span>({bookNum})</span>
        </div>
        <div className="flex items-center text-[#DDDDDD] text-[12px] font-[300] gap-[86px]">
          <span>دارم میخونم</span>
          <span>(0)</span>
        </div>
        <div className="flex items-center text-[#DDDDDD] text-[12px] font-[300] gap-[100px]">
          <span>خوانده ام</span>
          <span>(0)</span>
        </div>
      </div>
    </div>
  );
}
