export default function Card() {
  return (
    <div className="flex flex-row-reverse gap-2 w-4/5 h-48 bg-[#A4C0ED] mx-auto mt-20 rounded-2xl ">
      <img
        src="src/assets/images/Rectangle-88.png"
        alt="gig"
        className=" h-[170px] m-2.5 my-3"
      />
      <div className="flex flex-col gap-2 items-end ">
        <div>
          <h1 className="text-right mt-2.5 font-medium text-[24px]">
            {" "}
            (رسمی یا غیر رسمی)نام تالار
          </h1>
          <div className="flex gap-3.5 flex-row-reverse text-[14px]">
            <h4 dir="rtl" className="text-[#333333] ">
              {" "}
              234234 عضو{" "}
            </h4>
            <h4 className="text-[#333333]">ساخته شده در 2 ساعت پیش</h4>
          </div>
        </div>
        <p className="text-right ml-4 ">
          توضیحات: این متن صرفاً جهت تست متن داخل توضیحات تالار می باشد.
          توضیحات: این متن صرفاً جهت تست متن داخل توضیحات تالار می باشد.وضیحات:
          این متن صرفاً جهت تست متن داخل توضیحات تالار می باشد.توضیحات: این متن
          صرفاً جهت تست متن داخل توضیحات تالار می باشد.
        </p>
      </div>
    </div>
  );
}
