export default function Card() {
  return (
    <div className="flex flex-row-reverse gap-1.5 shadow-2xl w-xl h-50 bg-white mx-auto mt-15 rounded-2xl hover:scale-105 transition-all duration-250 hover:shadow-3xl hover:cursor-pointer ">
      {/* <img
        src="src/assets/images/Rectangle-88.png"
        alt="gig"
        className=" h-[170px] m-2.5 my-3"
      /> */}
      <div className="flex flex-col gap-2 items-end  ">
        <div>
          <h1 className="text-right mt-2.5 font-medium text-[24px] mr-3.5">
            {" "}
            (رسمی یا غیر رسمی)نام تالار
          </h1>
          <div className="flex gap-3.5 flex-row-reverse text-[14px] mt-[10px] mr-3.5 ">
            <h4 dir="rtl" className="text-[#333333] ">
              {" "}
              نام نویسنده
            </h4>
            <h4 className="text-[#333333]">ساخته شده در 2 ساعت پیش</h4>
          </div>
        </div>
        <div className=" mx-1.5 pr-2 rounded-xl  ">
          <p className="text-right ml-4 mt-[10px]  ">
            توضیحات: این متن صرفاً جهت تست متن داخل توضیحات تالار می باشد.
            توضیحات: این متن صرفاً جهت تست متن داخل توضیحات تالار می
            باشد.توضیحات: این متن صرفاً جهت تست متن داخل توضیحات تالار می
            .باشد
          </p>
        </div>
      </div>
    </div>
  );
}
